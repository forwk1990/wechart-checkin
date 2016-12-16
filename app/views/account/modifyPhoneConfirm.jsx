import React from 'react'
import {connect} from 'react-redux';
import LoadingButton from 'loadingButton';
import CountDown from 'countDown';
import './modifyPhoneConfirm.scss'
import {hashHistory} from 'react-router';
import {MessageBox, Validator} from 'Utils';
import DataStore from 'DataStore';
import ActionTypes from 'constants/ActionTypes';

class ModifyPhoneConfirm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSaving: false,
            isStop: false
        };
    }

    handleSave() {
        const self = this;
        let phone = this.refs['phone'].value;
        let code = this.refs['code'].value;
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

        DataStore.validatePhone({phone}).then(function (responseObject) {
            if (responseObject.code != code) {
                MessageBox.show("验证码不正确");
            } else {
                self.setState({isSaving: true});
                DataStore.modifyPhone({phone, id: self.props.id}).then(function () {
                    self.setState({isSaving: false, isStop: true});
                    self.props.dispatch({type: ActionTypes.modifyPhone, phone: phone});
                    hashHistory.go(-2);
                }, function () {
                    self.setState({isSaving: false, isStop: true});
                });
            }
        }, function (error) {
            MessageBox.show(error.message);
        });

    }

    handleVerifyCode() {
        const phone = this.refs['phone'].value;
        if (!phone) {
            MessageBox.show("请输入手机号");
            return;
        }
        // 获取手机验证码
        DataStore.getVerifyCode({phone: phone, type: 4}).then(function () {
            console.info("get verify code success");
        }, function (error) {
            console.info(error);
        });
    }

    render() {
        return (
            <div className="modify-phone-confirm">
                <div className="modify-title-container">
                    <div className="image">
                        <img src={require("phone_light")}/>
                    </div>
                    <div className="title">联系手机</div>
                </div>
                <div className="modify-phone-confirm-input-base">
                    <div className="label">新手机号</div>
                    <input type="text" ref="phone"/>
                </div>
                <div className="modify-phone-confirm-input-base">
                    <div className="label">短信验证码</div>
                    <input type="text" ref="code" name="code"/>
                    <CountDown text="点击获取" stop={this.state.isStop} onClick={ () => this.handleVerifyCode()}/>
                </div>
                <LoadingButton text="确认更改" loadingText="正在为您保存..." status={this.state.isSaving}
                               onClick={() => this.handleSave()}/>
            </div>
        );
    }
}


ModifyPhoneConfirm.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        id: state.userInfoReducer.id,
        phone: state.userInfoReducer.phone /*微信号码*/
    }
}

export default connect(mapStateToProps)(ModifyPhoneConfirm);