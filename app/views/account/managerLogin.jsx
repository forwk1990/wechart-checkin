import './login.scss';

import React from 'react';
import LoadingButton from 'loadingButton';
import {connect} from 'react-redux';
import {MessageBox} from 'Utils';
import DataStore from 'DataStore';
import ActionTypes from 'constants/ActionTypes';


class ManagerLogin extends React.Component {

    constructor(props) {
        super(props);
        this.turnLeft = true;
        this.state = {
            isLanding: false
        };
    }

    loginByPassword() {
        const username = this.refs['username'].value;
        const password = this.refs['password'].value;
        if (!username) {
            MessageBox.show("请输入帐号");
            return;
        }
        if (!password) {
            MessageBox.show("请输入密码");
            return;
        }
        this.login({username: username, password: md5(password)});
    }

    login(parameters) {
        const self = this;
        self.setState({isLanding: true});
        DataStore.managerLogin(parameters).then(function (responseObject) {
            self.setState({isLanding: false});
            self.props.dispatch({type: ActionTypes.managerLogin, responseObject});
            if (self.props.params.code) {
                self.context.router.replace(`validate/${self.props.params.code}`);
            }
        }, function (error) {
            self.setState({isLanding: false});
            MessageBox.show(error.message);
        });
    }

    render() {
        return (
            <div className="login-page">
                <div className="login-page-v">
                    <div className="login-page-title">喜悦验票</div>
                    <div className="login-page-edit-row">
                        <div className="left-label">帐号</div>
                        <input type="text" name="username" ref="username"/>
                    </div>
                    <div className="login-page-edit-row">
                        <div className="left-label">登陆密码</div>
                        <input type="password" name="password" ref="password"/>
                    </div>
                    <LoadingButton text="登陆" loadingText="正在为您登陆..." status={this.state.isLanding}
                                   onClick={() => this.loginByPassword()}/>
                </div>
            </div>
        );
    }
}

ManagerLogin.contextTypes = {
    router: React.PropTypes.object
}

export default connect()(ManagerLogin);