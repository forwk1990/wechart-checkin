/**
 * Created by itachi on 16/11/9.
 */

import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './app.js'
import store from './store.js'
import {Router, Route, browserHistory, applyRouterMiddleware,IndexRoute} from 'react-router';


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.body
)