import { handleActions } from 'redux-actions';

const superSlice = (array, pos, element = null) => {
    console.error(array, pos)
    return element ? [...array.slice(0, pos ? pos - 1 : 0), element, ...array.slice(pos + 1)]
         : [...array.slice(0, pos ? pos - 1 : 0), ...array.slice(pos + 1)]
}

const find = (array, element) =>
    array.reduce((acc, cur, idx) => (cur._id.toLowerCase() === element._id.toLowerCase() ? idx : acc), -1)

const CRUD = (stateKey) => ({
    CREATE: (state, {payload}) => {
        const repo = state[stateKey]
        const found = find(repo, payload) !== -1
        return {
            ...state,
            [stateKey]: found ?
            state[stateKey] :
            state[stateKey].concat([Object.assign({show: true},
                                                  payload,
                                                  {_id: payload._id.toLowerCase()})])
        }
    },
    READ: (state) => (state),
    UPDATE: (state, {payload}) => {
        const prev = state[stateKey][payload._id]
        const repo = state[stateKey]
        return {
            ...state,
            [stateKey]: superSlice(repo, find(repo, payload),
                                   Object.assign({}, prev, payload,
                                                 {_id: payload._id.toLowerCase()}))
        }
    },
    DELETE: (state, {payload}) => {
        const repo = state[stateKey]
        return {
            ...state,
            [stateKey]: superSlice(repo, find(repo, payload))
        }
    }
})

const rootReducer = handleActions({
    APP: {
        SETTINGS: ({settings, ...state}, {payload}) => ({
            ...state,
            settings: payload,
        }),
        HASHTAGS: CRUD('hashtags'),
        USERS: CRUD('users', 'screen_name'),
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
        APPEND: ({twitter, ...state}, {payload}) => ({
            ...state,
            twitter: {
                ...twitter,
                last: twitter.last.concat([payload]).slice(-10)
            }
        })
    }
}, {settings: {}, hashtags: [], users: [], twitter: {connected: false, error: false, last: []}})

export { rootReducer as default }
