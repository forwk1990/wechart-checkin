/**
 * Created by itachi on 16/11/9.
 */

import loggerMiddleware from './libs/middleware/logger.js'
import thunkMiddleware from 'redux-thunk'
import delayMiddleware from './libs/middleware/delay.js'
import rootReducer from './libs/reducers/rootReducer.js'
import {createStore,applyMiddleware,compose} from 'redux'

// 扩展createStore
var enhancerCreateStore = applyMiddleware(
    loggerMiddleware,
    thunkMiddleware,
    delayMiddleware
)(createStore);

const store = enhancerCreateStore(rootReducer);

export default store;





