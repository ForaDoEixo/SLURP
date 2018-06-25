import Settings from '../components/settings';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actionCreators from '../actions'

const ConnectedSettings = connect(
    ({settings}) => ({settings}),
    (dispatch) => ({action: bindActionCreators(actionCreators.app.settings, dispatch)})
)(Settings)

export { ConnectedSettings as default }
