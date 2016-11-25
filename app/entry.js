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
import Success from 'success'
import Map from 'map'
import store from './store.js'
import Validate from 'validate'
import {Router, Route, hashHistory,IndexRoute} from 'react-router';


ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Index}/>
                <Route path="ticket/:code" component={Ticket}/>
                <Route path="index" component={Index}/>
                <Route path="edit" component={Edit}/>
                <Route path="success" component={Success}/>
                <Route path="map" component={Map}/>
                <Route path="validate/:code" component={Validate}/>
            </Route>
        </Router>
    </Provider>
    , document.getElementById("container")
)