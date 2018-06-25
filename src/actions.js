import { createActions } from 'redux-actions';

const actionCreators = createActions({
    APP: {
        SETTINGS: undefined,
        HASHTAGS: {
            ADD: undefined,
            REMOVE: undefined,
            TOGGLE: undefined,
        },
        USERS: {
            ADD: undefined,
            REMOVE: undefined,
            TOGGLE: undefined,
        }
    },
    TWITTER: {
        CONNECT: undefined,
        DISCONNECT: undefined,
        ERROR: undefined,
    }
})

export { actionCreators as default }
