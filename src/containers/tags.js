import TagsSelector from '../components/tags';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actionCreators from '../actions';

const HashTagsSelector = connect(
    ({hashtags}) => ({name: 'hashtags', defaultField: 'hashtag',
                      collection: hashtags, marker: '#', baseURL: 'https://twitter.com/hashtag/'}),
    (dispatch) => ({actions: bindActionCreators(actionCreators.app.hashtags, dispatch)})
)(TagsSelector)

const UsersSelector = connect(
    ({users}) => ({name: 'users', defaultField: 'screen_name',
                   collection: users, marker: '@', baseURL: 'https://twitter.com/'}),
    (dispatch) => ({actions: bindActionCreators(actionCreators.app.users, dispatch)})
)(TagsSelector)

export { HashTagsSelector, UsersSelector }
