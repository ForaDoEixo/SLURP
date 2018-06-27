import { createActions } from 'redux-actions';

const CRUD = {
    CREATE: undefined,
    READ: undefined,
    UPDATE: undefined,
    DELETE: undefined
}

const actionCreators = createActions({
    APP: {
        SETTINGS: undefined,
        HASHTAGS: CRUD,
        USERS: CRUD
    },
    TWITTER: {
        CONNECT: undefined,
        DISCONNECT: undefined,
        ERROR: undefined,
        APPEND: undefined
    }
})

export { actionCreators as default }
