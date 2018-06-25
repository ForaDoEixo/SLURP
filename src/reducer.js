import { handleActions } from 'redux-actions';

const rootReducer = handleActions({
    APP: {
        SETTINGS: ({settings, ...state}, {payload}) => ({
            ...state,
            settings: payload,
        }),
        HASHTAGS: {
            ADD: ({hashtags, ...state}, {payload}) => ({
                ...state,
                hashtags: {
                    ...hashtags,
                    [payload] : true
                }}),
            REMOVE: ({hashtags, ...state}, {payload}) => {
                delete hashtags[payload]
                return {...state, hashtags}
            },
            TOGGLE: ({hashtags}, {payload}) => {
                hashtags[payload] = !!!hashtags[payload]
                return {hashtags}
            }
        },
        USERS: {
            ADD: ({users, ...state}, {payload}) => ({
                ...state,
                users: {
                    ...users,
                    [payload] : true
                }}),
            REMOVE: ({users, ...state}, {payload}) => {
                delete users[payload]
                return {...state, users}
            },
            TOGGLE: ({users}, {payload}) => {
                users[payload] = !!!users[payload]
                return {users}
            }
        },
    }, TWITTER: {
        CONNECT: (state, {payload}) => ({
            ...state,
            twitter: {connected: true, error: true, status: payload}
        }),
        DISCONNECT: (state, {payload}) => ({
            ...state,
            twitter: {connected: false, error: false, status: payload}
        }),
        ERROR: (state, {payload}) => ({
            ...state,
            twitter: {connected: false, error: true, status: payload}
        }),
    }
}, {settings: {}, hashtags: {}, users: {}, twitter: {connected: false, error: false}})

export { rootReducer as default }
