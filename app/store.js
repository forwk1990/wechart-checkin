/**
 * Created by itachi on 16/11/9.
 */

import loggerMiddleware from './libs/middleware/logger.js'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './libs/reducers/rootReducer.js'
import {createStore,applyMiddleware} from 'redux'

// 扩展createStore
var enhancerCreateStore = applyMiddleware(
    thunkMiddleware
)(createStore);

const store = enhancerCreateStore(rootReducer);

export default store;





