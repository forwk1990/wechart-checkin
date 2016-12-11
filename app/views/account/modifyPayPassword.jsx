import React from 'react'
import {connect} from 'react-redux';
import LoadingButton from 'loadingButton';
import CountDown from 'countDown';
import './modifyPassword.scss'
import {MessageBox, Validator} from 'Utils';
import DataStore from 'DataStore';
import ActionTypes from 'constants/ActionTypes';
import {hashHistory} from 'react-router';

class ModifyPayPassword extends React.Component {

    constructor(props) {
        super(props);
        this.turnLeft = true;
        this.state = {
            isSaving1: false,
            isSaving2: false,
            isStop: false
        };
    }

    handleSave() {
        //this.context.router.push('mine/modifyPasswordConfirm');

        const self = this;
        const oldPassword = self.refs["oldPassword"].value;
        if (oldPassword !== self.props.payPassword) {
            MessageBox.show("旧密码不正确");
            return;
        }
        const newPassword = self.refs["newPassword"].value;
        const confirmPassword = self.refs["confirmPassword"].value;
        if (!newPassword) {
            MessageBox.show("新密码不能为空");
            return;
        }
        if (!confirmPassword) {
            MessageBox.show("确认密码不能为空");
            return;
        }
        if (newPassword != confirmPassword) {
            MessageBox.show("两次输入的密码不一致");
            return;
        }
        self.setState({isSaving1: true});
        DataStore.modifyPayPassword({id: self.props.id, payPassword: confirmPassword}).then(function () {
            self.setState({isSaving1: false});
            self.props.dispatch({type: ActionTypes.modifyPayPassword, payPassword: confirmPassword});
            self.context.router.goBack();
        }, function (error) {
            self.setState({isSaving1: false});
        });

    }

    handleNext() {
        const self = this;
        const code = self.refs["code"].value;
        self.setState({isSaving2: true});
        DataStore.validatePhone({phone: self.props.phone}).then(function (responseObject) {
            self.setState({isSaving2: false});
            if (responseObject.code != code) {
                MessageBox.show("验证码不正确");
            } else {
                self.setState({isStop: true});
                self.context.router.push('mine/modifyPayPasswordByCode');
            }
        }, function (error) {
            self.setState({isSaving2: false});
        });
    }

    handleSwitch() {
        if (this.turnLeft) {
            $('.modify-password-v').addClass("turn-left");
            $('.modify-password-p').addClass("turn-right");
        } else {
            $('.modify-password-v').removeClass("turn-left");
            $('.modify-password-p').removeClass("turn-right");
        }
        this.turnLeft = !this.turnLeft;
    }

    render() {
        return (
            <div className="modify-page">
                <div className="modify-password-v">
                    <div className="modify-title-container">
                        <div className="image">
                            <img src={require("password_light")}/>
                        </div>
                        <div className="title">支付密码</div>
                    </div>
                    <div className="modify-page-input-base">
                        <div className="label">旧密码</div>
                        <input type="text" ref="oldPassword"/>
                    </div>
                    <div className="modify-page-input-base">
                        <div className="label">新密码</div>
                        <input type="text" ref="newPassword"/>
                    </div>
                    <div className="modify-page-input-base">
                        <div className="label">再次输入</div>
                        <input type="text" ref="confirmPassword"/>
                    </div>
                    <LoadingButton text="确认修改" loadingText="正在为您保存..." status={this.state.isSaving1}
                                   onClick={() => this.handleSave()}/>
                    <div className="modify-msg" onClick={() => this.handleSwitch()}>手机短信验证修改</div>
                </div>
                <div className="modify-password-p">
                    <div className="modify-title-container">
                        <div className="image">
                            <img src={require("password_light")}/>
                        </div>
                        <div className="title">支付密码</div>
                    </div>
                    <div className="modify-page-input-base">
                        <div className="label">手机号码</div>
                        <input type="text" ref="phone" value={this.props.phone} disabled="disabled"/>
                    </div>
                    <div className="modify-page-input-base">
                        <div className="label">短信验证码</div>
                        <input type="text" ref="code" name="code"/>
                        <CountDown text="获取短信验证码" stop={this.state.isStop}/>
                    </div>
                    <LoadingButton text="下一步" loadingText="正在为您验证手机号码..." status={this.state.isSaving2}
                                   onClick={() => this.handleNext()}/>
                    <div className="modify-msg" onClick={() => this.handleSwitch()}>手机密码修改</div>
                </div>

            </div>

        );
    }
}


ModifyPayPassword.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        id: state.userInfoReducer.id,
        payPassword: state.userInfoReducer.payPassword, /*支付密码*/
        phone: state.userInfoReducer.phone /*微信号码*/
    }
}

export default connect(mapStateToProps)(ModifyPayPassword);