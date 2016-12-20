import React from 'react';
import './vipInvite.scss';
import LoadingButton from 'loadingButton';
import CountDown from 'countDown';
import DataStore from 'DataStore';
import {MessageBox, Validator} from 'Utils';

class VipInvite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isStop: false,
            isRequest: false
        };
    }

    handleRequest() {
        const name = this.refs['name'].value;
        if (!name) {
            MessageBox.show("请输入您的真实姓名");
            return;
        }
        const phone = this.refs['phone'].value;
        if (!phone) {
            MessageBox.show("请输入您的手机号码");
            return;
        } else if (!Validator.isRegularPhone(phone)) {
            MessageBox.show("请输入正确的手机号码");
            return;
        }

        const code = this.refs['code'].value;
        if (!code) {
            MessageBox.show("请输入短信验证码");
            return;
        }

        const IDNumber = this.refs['card'].value;
        if (!IDNumber) {
            MessageBox.show("请输入身份证号码");
            return;
        }

        const self = this;
        self.setState({isRequest: true});

        /*接受邀请,注册成为高级会员*/
        DataStore.acceptInvite({
            name,
            phone,
            code,
            IDNumber,
            inviteCode: this.props.params.inviteCode
        }).then(function () {
            self.setState({isRequest: false, isStop: true});
            self.context.router.push('vipSuccess');
        }, function (error) {
            self.setState({isRequest: false, isStop: true});
            if (error.status == 61453) {
                self.context.router.push('vipExist');
            } else if(error.status == 61452){
                self.context.router.push(`vipInvalidate/${self.props.params.name}`);
            }else{ // 无效的验证码
                MessageBox.show(error.message);
            }
        });

    }

    handleVerifyCode() {
        const phone = this.refs['phone'].value;
        if (!phone) {
            MessageBox.show("请输入手机号");
            return false;
        }
        // 获取手机验证码
        DataStore.getVerifyCode({phone: phone, type: 4}).then(function () {
            console.info("get verify code success");
        }, function (error) {
            console.info(error);
        });
    }

    render() {
        const {name} = this.props.params;
        return (
            <div className="vip-invite">
                <div className="vip-invite-top-bar">
                    接受{name}的邀请成为喜悦高级会员
                </div>
                <div className="vip-invite-title">
                    喜悦邀请
                </div>
                <div className="vip-invite-content">
                    <div className="vip-invite-content-edit-row">
                        <div className="left-label">姓名</div>
                        <input type="text" name="name" ref="name"/>
                    </div>
                    <div className="vip-invite-content-edit-row">
                        <div className="left-label">手机号码</div>
                        <input type="tel" name="phone" ref="phone"/>
                    </div>
                    <div className="vip-invite-content-edit-row">
                        <div className="left-label">短信验证码</div>
                        <input type="tel" name="code" ref="code"/>
                        <CountDown text="点击获取" stop={this.state.isStop} onClick={() => this.handleVerifyCode()}/>
                    </div>
                    <div className="vip-invite-content-edit-row">
                        <div className="left-label">身份证号码</div>
                        <input type="text" name="card" ref="card"/>
                    </div>
                    <LoadingButton text="提交" loadingText="正在为您派发会员资格..." status={this.state.isRequest}
                                   onClick={() => this.handleRequest()}/>
                </div>
            </div>
        );
    }

}

VipInvite.contextTypes = {
    router: React.PropTypes.object
}

export default VipInvite;