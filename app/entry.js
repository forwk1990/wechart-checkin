/**
 * Created by itachi on 16/11/9.
 */

import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './app.js'
import Edit from 'edit'
import Ticket from 'ticket'
import Index from 'index'
import Success from 'Success'
import store from './store.js'
import {Router, Route, browserHistory,IndexRoute} from 'react-router';

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/checkin" component={App}>
                <IndexRoute component={Index}/>
                <Route path="ticket/:code" component={Ticket}/>
                <Route path="index" component={Index}/>
                <Route path="edit" component={Edit}/>
                <Route path="success" component={Success}/>
            </Route>
        </Router>
    </Provider>
    , document.getElementById("container")
)