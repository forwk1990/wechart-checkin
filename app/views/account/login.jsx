import './login.scss';

import React from 'react';
import CountDown from 'countDown';
import LoadingButton from 'loadingButton';
import {connect} from 'react-redux';
import {MessageBox, Validator} from 'Utils';
import DataStore from 'DataStore';
import QueryString from 'query-string'
import ActionTypes from 'constants/ActionTypes';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.turnLeft = true;
        this.state = {
            isLanding: false,
            isStop: false
        };
    }

    componentDidMount() {
        document.title = "喜悦登陆";
    }

    loginByCode() {
        const self = this;
        const phone = this.refs['v-phone'].value;
        const code = this.refs['v-code'].value;
        if (!phone) {
            MessageBox.show("请输入手机号");
            return;
        }
        if (!code) {
            MessageBox.show("请输入验证码");
            return;
        }
        if (!Validator.isRegularPhone(phone)) {
            MessageBox.show("手机号格式不正确");
            return;
        }
        self.setState({isLanding: true});
        const queryParameters = QueryString.parse(location.search);
        this.login({phone: phone, code: code, wxCode: queryParameters.code}, true);
    }

    loginByPassword(phone, password) {
        const _phone = this.refs['p-phone'].value;
        const _password = this.refs['p-password'].value;
        if (!_phone) {
            MessageBox.show("请输入手机号");
            return;
        }
        if (!_password) {
            MessageBox.show("请输入密码");
            return;
        }
        if (!Validator.isRegularPhone(_phone)) {
            MessageBox.show("手机号格式不正确");
            return;
        }
        const queryParameters = QueryString.parse(location.search);
        this.login({phone: _phone, password: md5(_password), wxCode: queryParameters.code});
    }

    login(parameters, isStop) {
        const self = this;
        self.setState({isLanding: true});
        DataStore.login(parameters).then(function (responseObject) {
            if (isStop) self.setState({isStop: true});
            self.setState({isLanding: false});
            self.props.dispatch({type: ActionTypes.login, responseObject});
 /*           if (self.props.params.returnPage) {
                self.context.router.replace(`mine/${self.props.params.returnPage}`);
            } else {
                self.context.router.replace('mine/archive');
            }*/
        }, function (error) {
            self.setState({isLanding: false});
            MessageBox.show(error.message);
        });
    }

    handleLogin() {
        const self = this;
        if (self.turnLeft) {
            self.loginByCode();
        } else {
            self.loginByPassword();
        }
    }

    handleSwitch() {
        if (this.turnLeft) {
            $('.login-page-v').addClass("turn-left");
            $('.login-page-p').addClass("turn-right");
        } else {
            $('.login-page-v').removeClass("turn-left");
            $('.login-page-p').removeClass("turn-right");
        }
        this.turnLeft = !this.turnLeft;
    }

    handleVerifyCode() {
        const phone = this.refs['v-phone'].value;
        if (!phone) {
            MessageBox.show("请输入手机号");
            return false;
        }
        // 获取手机验证码
        DataStore.getVerifyCode({phone: phone, type: 1}).then(function () {
            console.info("get verify code success");
        }, function (error) {
            console.info(error);
        });
    }

    render() {
        return (
            <div className="login-page">
                <div className="login-page-v">
                    <div className="login-page-title">手机快速登陆</div>
                    <div className="login-page-edit-row">
                        <div className="left-label">手机号码</div>
                        <input type="tel" name="phone" ref="v-phone"/>
                    </div>
                    <div className="login-page-edit-row">
                        <div className="left-label">短信验证码</div>
                        <input type="tel" name="code" ref="v-code"/>
                        <CountDown text="点击获取" stop={this.state.isStop} onClick={() => this.handleVerifyCode()}/>
                    </div>
                    <LoadingButton text="登陆" loadingText="正在为您登陆..." status={this.state.isLanding}
                                   onClick={() => this.handleLogin()}/>
                    <div className="login-page-login-type" onClick={() => this.handleSwitch()}>密码登陆</div>
                </div>
                <div className="login-page-p">
                    <div className="login-page-title">喜悦登陆</div>
                    <div className="login-page-edit-row">
                        <div className="left-label">手机号码</div>
                        <input type="tel" name="phone" ref="p-phone"/>
                    </div>
                    <div className="login-page-edit-row">
                        <div className="left-label">登陆密码</div>
                        <input type="password" name="password" ref="p-password"/>
                    </div>
                    <LoadingButton text="登陆" loadingText="正在为您登陆..." status={this.state.isLanding}
                                   onClick={() => this.handleLogin()}/>
                    <div className="login-page-login-type" onClick={() => this.handleSwitch()}>短信登陆</div>
                </div>
            </div>
        );
    }
}

Login.contextTypes = {
    router: React.PropTypes.object
}

export default connect()(Login);