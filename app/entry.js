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
import SysIndex from 'sys/sysIndex'
import SysValue from 'sys/sysValue'
import {Router, Route, hashHistory,IndexRoute} from 'react-router';
import DataStore from 'DataStore'
import QueryString from 'query-string'
import FastClick from 'fastclick';

/*
*
* */
DataStore.wxConfig({currentUrl:window.location.href}).then(function(configObject){
    console.log("微信配置成功",window.location.href);
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
        const queryParameters = QueryString.parse(location.search);
        if (!queryParameters.id) return;
        var shareData = {
            title: '喜悦来了',
            desc: '报名啦',
            link: window.location.origin + `/wx/index.html?id=${queryParameters.id}`,
            imgUrl: "",
            trigger: function (res) {
                console.info('分享我的点单');
            },
            success: function (res) {
                console.info('已分享我的点单');
            },
            cancel: function (res) {
                console.info('已取消我的点单');
            },
            fail: function (res) {
                //console.info(JSON.stringify(res));
            }
        };
        wx.onMenuShareAppMessage(shareData);
        wx.onMenuShareTimeline(shareData);
        wx.onMenuShareQQ(shareData);
        wx.onMenuShareQZone(shareData);
        wx.onMenuShareWeibo(shareData);

        wx.hideMenuItems({
            menuList: [
                "menuItem:copyUrl",
                "menuItem:originPage",
                "menuItem:openWithQQBrowser",
                "menuItem:openWithSafari",
                "menuItem:exposeArticle",
                "menuItem:setFont"
            ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });

    });
});


ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Index}/>
                <Route path="t/:code/:shortCode/:isExt" component={Ticket}/>
                <Route path="index" component={Index}/>
                <Route path="edit" component={Edit}/>
                <Route path="success" component={Success}/>
                <Route path="map" component={Map}/>
                <Route path="v/:code" component={Validate}/>
                <Route path="sys" component={SysIndex}/>
                <Route path="sysValue" component={SysValue}/>
            </Route>
        </Router>
    </Provider>
    , document.getElementById("container")
)

window.onload = function(){
    FastClick.attach(document.body);
}
