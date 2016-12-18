import React from 'react';
import './vipInvite.scss';
import LoadingButton from 'loadingButton';
import CountDown from 'countDown';

class VipInvite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isStop: false,
            isRequest:false
        };
    }

    handleLogin(){

    }

    render() {
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
                                   onClick={() => this.handleLogin()}/>
                </div>
            </div>
        );
    }

}

export default VipInvite;