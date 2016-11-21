/**
 * Created by itachi on 16/11/9.
 */


import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './app.js'
import Edit from 'edit'
import Map from 'map'
import Success from 'success'
import Ticket from 'ticket'
import LifeCalculator from 'lifeCalculator'
import store from './store.js'
import {Router, Route, browserHistory, applyRouterMiddleware,IndexRoute} from 'react-router';


// ReactDOM.render(
//     <Provider store={store}>
//         <Edit/>
//     </Provider>
//     , document.getElementById("container")
// )
ReactDOM.render(
    <Provider store={store}>
        <Map longitude={114.334} latitude={30.50792}/>
    </Provider>
    , document.getElementById("container")
)