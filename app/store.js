/**
 * Created by itachi on 16/11/9.
 */

import loggerMiddleware from './libs/middleware/logger.js'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './libs/reducers/rootReducer.js'
import persistState from 'redux-localstorage'
import {compose,createStore,applyMiddleware} from 'redux'

const persistedReducers = [
    ''
];

// 扩展createStore
var enhancerCreateStore = compose(
    persistState(persistedReducers)
)(applyMiddleware(
    thunkMiddleware
)(createStore));

const store = enhancerCreateStore(rootReducer);

export default store;





