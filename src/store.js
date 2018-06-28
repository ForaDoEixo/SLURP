import { applyMiddleware, createStore } from 'redux';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localforage';

import rootReducer from './reducer'
import handleChange from './store-listner'

const reducer = storage.reducer(rootReducer)
const engine = createEngine('slurp');
const middleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
const store = createStoreWithMiddleware(reducer)

const load = storage.createLoader(engine);
load(store);

const unsubscribe = store.subscribe(handleChange(store))

export { store as default, unsubscribe }
