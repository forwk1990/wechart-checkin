import './login.scss';

import React from 'react';
import CountDown from 'countDown';
import LoadingButton from 'loadingButton';
import {connect} from 'react-redux';
import {MessageBox} from 'Utils';
import DataStore from 'DataStore';
import ActionTypes from 'constants/ActionTypes';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.turnLeft = true;
        this.state = {
            isLanding: false
        };
    }

    handleLogin() {
        const self = this;
        let parameters = {};
        if (this.turnLeft) {
            let phone = this.refs['v-phone'].value;
            let code = this.refs['v-code'].value;
            if (!phone) {
                MessageBox.show("请输入手机号");
                return;
            }
            if (!code) {
                MessageBox.show("请输入验证码");
                return;
            }
            if (!(/^1[34578]\d{9}$/.test(phone))) {
                MessageBox.show("手机号格式不正确");
                return;
            }
            parameters = {phone, code};
        } else {
            let phone = this.refs['p-phone'].value;
            let password = this.refs['p-password'].value;
            if (!phone) {
                MessageBox.show("请输入手机号");
                return;
            }
            if (!password) {
                MessageBox.show("请输入密码");
                return;
            }
            if (!(/^1[34578]\d{9}$/.test(phone))) {
                MessageBox.show("手机号格式不正确");
                return;
            }
            parameters = {phone, code};
        }
        self.setState({isLanding: true});
        DataStore.login(parameters).then(function (responseObject) {
            self.setState({isLanding: false});
            self.props.dispatch({type: ActionTypes.login, responseObject});
            if(self.props.params.returnPage){
                self.context.router.replace(`mine/${self.props.params.returnPage}`);
            }else{
                self.context.router.replace('mine/archive');
            }
        }, function (error) {
            self.setState({isLanding: false});
            MessageBox.show(error);
        });
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

    render() {
        return (
            <div className="login-page">
                <div className="login-page-v">
                    <div className="login-page-title">喜悦登陆</div>
                    <div className="login-page-edit-row">
                        <div className="left-label">手机号码</div>
                        <input type="tel" name="phone" ref="v-phone"/>
                    </div>
                    <div className="login-page-edit-row">
                        <div className="left-label">短信验证码</div>
                        <input type="tel" name="code" ref="v-code"/>
                        <CountDown text="获取短信验证码"/>
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
                        <input type="tel" name="password" ref="p-password"/>
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