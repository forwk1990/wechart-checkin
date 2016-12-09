/**
 * Created by itachi on 16/11/9.
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import store from './store.js'
import App from './app.js'


import Edit from 'checkin/edit'
import Ticket from 'checkin/ticket'
import Index from 'checkin/index'
import Success from 'checkin/success'
import Validate from 'checkin/validate'

import LifeIndex from 'life/index'

import SysIndex from 'sys/sysIndex'
import SysValue from 'sys/sysValue'

import MyActivity from 'comming/myActivity';
import {MoreIntegral, MyIntegral, IntegralDetail} from 'comming/myIntegral';

import Login from 'account/login'
import Archive from 'account/archive'
import ModifyWx from 'account/modifyWechart';
import ModifyMail from 'account/modifyMail';
import ModifyPhone from 'account/modifyPhone';
import ModifyPhoneConfirm from 'account/modifyPhoneConfirm'
import ModifyPassword from 'account/modifyPassword'
import ModifyPasswordByCode from 'account/modifyPasswordByCode'
import ModifyPasswordConfirm from 'account/modifyPasswordConfirm'
import ModifyId from 'account/modifyId'
import ModifyBirthday from 'account/modifyBirthday'
import ModifyAddress from 'account/modifyAddress'
import ModifyNickname from 'account/modifyNickname'

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
                <Route path="validate/:code" component={Validate}/>
                <Route path="sys" component={SysIndex}/>
                <Route path="sysValue" component={SysValue}/>
                <Route path="life/:type" component={LifeIndex}/>
                <Route path="mine/activity" component={MyActivity}/>
                <Route path="mine/integral" component={MyIntegral}/>
                <Route path="mine/moreIntegral" component={MoreIntegral}/>
                <Route path="mine/integralDetail" component={IntegralDetail}/>
                <Route path="mine/archive" component={Archive}/>
                <Route path="mine/modifyWx" component={ModifyWx}/>
                <Route path="mine/modifyMail" component={ModifyMail}/>
                <Route path="mine/modifyPhone" component={ModifyPhone}/>
                <Route path="mine/modifyPhoneConfirm" component={ModifyPhoneConfirm}/>
                <Route path="mine/modifyPassword" component={ModifyPassword}/>
                <Route path="mine/modifyPasswordByCode" component={ModifyPasswordByCode}/>
                <Route path="mine/modifyPasswordConfirm" component={ModifyPasswordConfirm}/>
                <Route path="mine/modifyId" component={ModifyId}/>
                <Route path="mine/modifyBirthday" component={ModifyBirthday}/>
                <Route path="mine/modifyAddress" component={ModifyAddress}/>
                <Route path="mine/modifyNickname" component={ModifyNickname}/>
                <Route path="login/:returnPage" component={Login}/>
                <Route path="login" component={Login}/>
            </Route>
        </Router>
    </Provider>
    , document.getElementById("container")
)


