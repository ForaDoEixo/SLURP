import { bindActionCreators } from 'redux';
import elasticsearch from 'elasticsearch';

import cloneDeep from 'clone-deep';
import deepEqual from 'deep-equal';

import actionCreators from './actions'

import { remote } from 'electron';
const Twitter = remote.require('twitter')

const ESClient = new elasticsearch.Client({
  host: 'http://localhost:9200',
  log: 'trace'
})

let previous = {};
let actions
let Client = null
let stream = null

const handleTwitter = ({hashtags, users, settings}) => {
  let updated = false
  if (! deepEqual(previous.hashtags, hashtags)) {
    updated = true
  }

  if (! deepEqual(previous.users, users)) {
    updated = true
  }

  if (! deepEqual(previous.settings, settings) || ! Client) {
    updated = true

    if (! settings.consumer_key) return
    if (! settings.consumer_secret) return
    if (! settings.access_token_key) return
    if (! settings.access_token_secret) return

    console.error('creating new twitter connexion', settings)
    Client = new Twitter(settings)
  }

  if (! updated) return

  const usersToFetch = users.filter(u => ! u.id).map(u => u._id)

  if (usersToFetch.length) {
    console.error('looking up', usersToFetch.join(','))

    return Client.get('users/lookup', {
      screen_name: usersToFetch.join(',')
    }).then(users => users.map((u, i) =>
      actions.users.update(Object.assign({_id: u.screen_name.toLowerCase()}, u))))
  }

  const config = {}

  if (hashtags.length + users.length === 0) return

  if (hashtags.length) config.track = hashtags.map(t => t.hashtag).join(',')
  if (users.length) config.follow = users.map(u => u.id).join(',')

  if (stream) stream.destroy()
  console.error('creating new stream', config)
  stream = Client.stream('statuses/filter', config)

  stream.on('data', function(event) {
    // console.error('event', event);
    //    actions.twitter.append(cloneDeep(event))

    if (! event.user  || ! event.user.screen_name) {
      console.error('unknown event', event)
      return // UNKOWN
    }

    const author = event.user.screen_name
    if (event.extended_tweet) {
      ESClient.index({index: 'exttwits', type: 'extended_tweet', id: event.id_str, body: {
        date: event.created_at, message: event.extended_tweet.full_text, author: author
      }})

      if (event.retweeted_status) {
        ESClient.index({index: 'retwits', type: 'retweet', id: event.id_str, body: {
          date: event.created_at, message: event.retweeted_status.text, author: event.retweeted_status.user.screen_name, linked: author
        }})
      }

      if (event.quoted_status) {
        ESClient.index({index: 'quots', type: 'quote', id: event.id_str, body: {
          date: event.created_at, message: event.quoted_status.text, author: event.quoted_status.user.screen_name, linked: author
        }})
      }

      if (event.text) {
        ESClient.index({index: 'twits', type: 'tweet', id: event.id_str, body: {
          date: event.created_at, message: event.text, author: author
        }})
      }

    }

  });

  stream.on('error', function(error) {
    console.error('error', error);
    actions.twitter.error(error)
  });}

const handleChange = (store) => {
  const {twitter, ...restState} = store.getState()

  console.error('change', restState)
  handleTwitter(restState)
  previous = cloneDeep(restState)
}

const makeListner = (store) => {
  actions = {
    twitter: bindActionCreators(actionCreators.twitter, store.dispatch),
    users:bindActionCreators(actionCreators.app.users, store.dispatch)
  }

  return () => handleChange(store)
}

export { makeListner as default }
