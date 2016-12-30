import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CountDown from 'countDown';
import LoadingButton from 'loadingButton'
import './loginModal.scss';
import {connect} from 'react-redux';
import {MessageBox, Validator} from 'Utils';
import DataStore from 'DataStore';
import ActionTypes from 'constants/ActionTypes';

function ModalContent(props) {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
}

class LoginModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isStop: false, isLanding: false};
    }

    handleLogin() {
        const self = this;
        const phone = this.refs['phone'].value;
        const code = this.refs['code'].value;
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
        self.login({phone: phone, code: code, wxCode: queryParameters.code});
    }

    login(parameters, isStop) {
        const self = this;
        self.setState({isLanding: true});
        DataStore.login(parameters).then(function (responseObject) {
            if (isStop) self.setState({isStop: true});
            self.setState({isLanding: false});
            self.props.dispatch({type: ActionTypes.login, responseObject});
            self.handleClick();
        }, function (error) {
            if (isStop) self.setState({isStop: false});
            self.setState({isLanding: false});
            MessageBox.show(error.message);
        });
    }

    handleClick() {
        if (this.props.onClose) this.props.onClose();
    }

    handleVerifyCode() {
        const phone = this.refs['phone'].value;
        if (!phone) {
            MessageBox.show("请输入手机号");
            return;
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
            <div className="login-modal" key="login-modal">
                <div className="login-modal-bg" onClick={() => this.handleClick()}></div>
                <ReactCSSTransitionGroup
                    transitionEnter={false}
                    transitionLeave={true} transitionLeaveTimeout={800}
                    transitionAppear={true} transitionAppearTimeout={1000}
                    transitionName={ {
                        leave: 'modal-leave',
                        leaveActive: 'modal-leave-active',
                        appear: 'modal-appear',
                        appearActive: 'modal-appear-active'
                    } } component={ModalContent}>
                    <div className="login-modal-content">
                        <div className="login-modal-content-close">
                            <img src={require('close')} onClick={() => this.handleClick()}/>
                        </div>
                        <div className="login-modal-content-title">喜悦登陆</div>
                        <div className="login-modal-content-edit-row">
                            <div className="left-label">手机号码</div>
                            <input type="tel" name="phone" ref="phone"/>
                        </div>
                        <div className="login-modal-content-edit-row">
                            <div className="left-label">短信验证码</div>
                            <input type="tel" name="code" ref="code"/>
                            <CountDown text="点击获取" stop={this.state.isStop} onClick={() => this.handleVerifyCode()}/>
                        </div>
                        <LoadingButton text="登陆" loadingText="正在为您登陆..." status={this.state.isLanding}
                                       onClick={() => this.handleLogin()}/>
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        );
    }

}

export default connect()(LoginModal);