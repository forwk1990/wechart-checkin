import './login.scss';

import React from 'react';
import CountDown from 'countDown';
import LoadingButton from 'loadingButton';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.turnLeft = true;
    }

    handleLogin() {

    }

    handleSwitch() {
        if(this.turnLeft){
            $('.login-page-v').addClass("turn-left");
            $('.login-page-p').addClass("turn-right");
        }else{
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
                        <input type="tel" name="phone"/>
                    </div>
                    <div className="login-page-edit-row">
                        <div className="left-label">短信验证码</div>
                        <input type="tel" name="code"/>
                        <CountDown text="获取短信验证码"/>
                    </div>
                    <LoadingButton text="登陆" loadingText="正在为您登陆..." status={0}
                                   onClick={() => this.handleLogin()}/>
                    <div className="login-page-login-type" onClick={() => this.handleSwitch()}>密码登陆</div>
                </div>
                <div className="login-page-p">
                    <div className="login-page-title">喜悦登陆</div>
                    <div className="login-page-edit-row">
                        <div className="left-label">手机号码</div>
                        <input type="tel" name="phone"/>
                    </div>
                    <div className="login-page-edit-row">
                        <div className="left-label">登陆密码</div>
                        <input type="tel" name="password"/>
                    </div>
                    <LoadingButton text="登陆" loadingText="正在为您登陆..." status={0}
                                   onClick={() => this.handleLogin()}/>
                    <div className="login-page-login-type" onClick={() => this.handleSwitch()}>短信登陆</div>
                </div>
            </div>
        );
    }
}

export default Login;