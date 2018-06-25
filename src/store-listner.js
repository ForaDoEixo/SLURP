import { bindActionCreators } from 'redux';

import cloneDeep from 'clone-deep';
import deepEqual from 'deep-equal';

import actionCreators from './actions'

import { remote } from 'electron';
const Twitter = remote.require('twitter')

let previous = {};
let actions
let Client

const handleTwitter = ({hashtags, users, settings}) => {
    let updated = false
    if (! deepEqual(previous.hashtags, hashtags)) {
        updated = true
    }

    if (! deepEqual(previous.users, users)) {
        updated = true
    }

    if (! updated) return

    if (! deepEqual(previous.settings, settings)) {

        if (! settings.consumer_key) return
        if (! settings.consumer_secret) return
        if (! settings.access_token) return
        if (! settings.access_token_secret) return

        Client = new Twitter(settings)
    } else {
        return
    }

    Client.get('application/rate_limit_status', {})
                 .then(status => {

                     if (updated) {
                         const users = Object.keys(users).filter(u => users[u])

                         const getUsers = () => {
                             if (! users.length) {
                                 return Promise.resolve([])
                             }

                             return Client.get('users/lookup', {users: users.join(',')})
                         }

                         getUsers().then(userIds => console.error(userIds))
                         /*
                            Twitter.stream('statuses/filter', {
                            track: Object.keys(state.hashtags).filter(h => state.hashtags[h]),
                            follow: 
                            })
                          */
                     }
                 })
                 .catch(status => {
                     console.error('error', status)
                 })
}

const handleChange = (store) => {
    const {twitter, ...restState} = store.getState()

    handleTwitter(restState)
    previous = cloneDeep(restState)
}

const makeListner = (store) => {
    actions = bindActionCreators(actionCreators.twitter, store.dispatch)

    return () => handleChange(store)
}

export { makeListner as default }
