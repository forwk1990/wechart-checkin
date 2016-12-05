/**
 * Created by itachi on 16/11/9.
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './app.js'
import Edit from 'edit'
import Ticket from 'ticket'
import Index from 'index'
import LifeIndex from 'life/index'
import Success from 'success'
import Map from 'map'
import store from './store.js'
import Validate from 'validate'
import SysIndex from 'sys/sysIndex'
import SysValue from 'sys/sysValue'
import MyActivity from 'comming/myActivity';
import MyIntegral from 'comming/myIntegral';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import DataStore from 'DataStore'
import QueryString from 'query-string'

/*
 *
 * */
const queryParameters = QueryString.parse(location.search);
if (queryParameters.id && wx && !__DEV__) {
    DataStore.getActivityInfo({id: queryParameters.id}).then(function (responseObject) {
        DataStore.wxConfig({currentUrl: window.location.href}).then(function (configObject) {
            console.log("微信配置成功", window.location.href);
            wx.config({
                debug: false,
                appId: configObject["appId"],
                timestamp: parseInt(configObject.timeStamp),//configObject.timeStamp
                nonceStr: configObject.nonceStr,
                signature: configObject.signature,
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'scanQRCode',
                    'onMenuShareQZone'
                ]
            });
            wx.ready(function () {
                var shareData = {
                    title: responseObject.title,
                    desc: responseObject.desc,
                    link: window.location.origin + `/wx/index.html?id=${queryParameters.id}`,
                    imgUrl: responseObject.imageUrl
                };
                wx.onMenuShareAppMessage(shareData);
                wx.onMenuShareTimeline(shareData);
                wx.onMenuShareQQ(shareData);
                wx.onMenuShareQZone(shareData);
                wx.onMenuShareWeibo(shareData);
                wx.hideMenuItems({
                    menuList: [
                        "menuItem:copyUrl", "menuItem:originPage", "menuItem:openWithQQBrowser",
                        "menuItem:openWithSafari", "menuItem:exposeArticle", "menuItem:setFont"
                    ]
                });
            });
        });
    });
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Index}/>
                <Route path="ticket/:code/:shortCode/:isExt" component={Ticket}/>
                <Route path="index" component={Index}/>
                <Route path="edit" component={Edit}/>
                <Route path="success" component={Success}/>
                <Route path="map" component={Map}/>
                <Route path="validate/:code" component={Validate}/>
                <Route path="sys" component={SysIndex}/>
                <Route path="sysValue" component={SysValue}/>
                <Route path="life/:type" component={LifeIndex}/>
                <Route path="mine/activity" component={MyActivity}/>
                <Route path="mine/integral" component={MyIntegral}/>
            </Route>
        </Router>
    </Provider>
    , document.getElementById("container")
)


