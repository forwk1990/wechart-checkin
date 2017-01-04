/**
 * Created by Itachi
 * on 2016-10-20.
 */

import React from 'react';
import './assets/stylesheets/app.scss';
import {connect} from 'react-redux';
import {MessageBox, Validator, WxManager} from 'Utils';
import DataStore from 'DataStore';
import ActionTypes from 'constants/ActionTypes'
import QRCodeModal from 'QRCodeModal'
import QueryString from 'query-string'
import {reactotronRedux} from 'reactotron-redux'

//Reactotron.configure({ name: 'React Native Demo' }).use(trackGlobalErrors()).connect()

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAutoLoginComplete: false,
            visible: false
        };
    }

    onClose() {
        this.setState({
            visible: false,
        });
    }

    /*
     * 组件挂载完毕后，启用自动登陆。
     * 清除User的时机应在子组件挂载前，确保子组件逻辑无侵入。
     * */
    componentDidMount() {

        const self = this;
        // if (!WxManager.isWx()) {
        //     this.context.router.push(`wxOnly`);
        //     return;
        // } else {
        //
        // }

        if (wx && !__DEV__) {
            const queryParameters = QueryString.parse(location.search);
            DataStore.wxConfig({
                currentUrl: window.location.href,
                code: queryParameters.code
            }).then(function (configObject) {
                if (configObject.subscribe != 1) {
                    self.setState({visible: true});
                }
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
                        'onMenuShareQZone',
                        'chooseImage',
                        'uploadImage',
                        'getLocation'
                    ]
                });
                wx.ready(function () {
                    const queryParameters = QueryString.parse(location.search);
                    if (queryParameters && queryParameters.id) {
                        DataStore.getActivityInfo({id: queryParameters.id}).then(function (responseObject) {
                            var shareData = {
                                title: responseObject.title,
                                desc: responseObject.desc,
                                link: window.location.origin + `/${__SERVER_RELATIVE_FOLDER}/index.jsp?id=${queryParameters.id}&t=${Math.random()}`,
                                imgUrl: responseObject.imageUrl
                            };
                            wx.onMenuShareAppMessage(shareData);
                            wx.onMenuShareTimeline(shareData);
                            wx.onMenuShareQQ(shareData);
                            wx.onMenuShareQZone(shareData);
                            wx.onMenuShareWeibo(shareData);
                        });
                    } else {

                    }
                    wx.hideMenuItems({
                        menuList: [
                            "menuItem:copyUrl", "menuItem:originPage", "menuItem:openWithQQBrowser",
                            "menuItem:openWithSafari", "menuItem:exposeArticle", "menuItem:setFont"
                        ]
                    });
                });
            });
        }

        if (this.props.id) {
            const self = this;
            self.setState({isAutoLoginComplete: true});
            if (self.props.token) {
                DataStore.autoLogin({id: self.props.id, token: self.props.token}).then(function (responseObject) {
                    self.props.dispatch({type: ActionTypes.login, responseObject});
                    self.setState({isAutoLoginComplete: false});
                }, function () {
                    self.props.dispatch({type: ActionTypes.clearUser});
                    self.setState({isAutoLoginComplete: false});
                });
            } else {
                self.props.dispatch({type: ActionTypes.clearUser});
                self.setState({isAutoLoginComplete: false});
            }
        }
    }

    render() {
        return this.state.isAutoLoginComplete ? ((
            <div className="loading">{this.state.visible && (<QRCodeModal onClose={() => this.onClose()}/>)}</div>)) : (
            <div className="app">
                {this.props.children}
                {this.state.visible && (<QRCodeModal onClose={() => this.onClose()}/>)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.userInfoReducer.id,
        token: state.userInfoReducer.token
    }
}

App.contextTypes = {
    router: React.PropTypes.object
}

export default connect(mapStateToProps)(App);
