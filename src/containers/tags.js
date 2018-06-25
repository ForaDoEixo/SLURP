import TagsSelector from '../components/tags';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actionCreators from '../actions';

const HashTagsSelector = connect(
    ({hashtags}) => ({name: 'hashtags', collection: hashtags, marker: '#'}),
    (dispatch) => ({actions: bindActionCreators(actionCreators.app.hashtags, dispatch)})
)(TagsSelector)

const UsersSelector = connect(
    ({users}) => ({name: 'users', collection: users, marker: '#'}),
    (dispatch) => ({actions: bindActionCreators(actionCreators.app.users, dispatch)})
)(TagsSelector)

export { HashTagsSelector, UsersSelector }
