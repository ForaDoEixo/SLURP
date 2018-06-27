import Info from '../components/info';
import { connect } from 'react-redux';

const ConnectedInfo = connect(
    ({twitter}) => ({...twitter}),
)(Info)

export { ConnectedInfo as default }
