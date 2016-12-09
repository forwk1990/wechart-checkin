import React from 'react'
import {connect} from 'react-redux';
import LoadingButton from 'loadingButton';
import CountDown from 'countDown';
import './modifyPassword.scss'
import {hashHistory} from 'react-router';

class ModifyPassword extends React.Component {

    constructor(props) {
        super(props);
        this.turnLeft = true;
        this.state = {
            isSaving: false
        };
    }

    handleSave() {
        //this.context.router.push('mine/modifyPasswordConfirm');
    }

    handleNext(){
        this.context.router.push('mine/modifyPasswordByCode');
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
                        <div className="title">登陆密码</div>
                    </div>
                    <div className="input-base">
                        <div className="label">旧密码</div>
                        <input type="text" ref="oldPassword" />
                    </div>
                    <div className="input-base">
                        <div className="label">新密码</div>
                        <input type="text" ref="newPassword" />
                    </div>
                    <div className="input-base">
                        <div className="label">再次输入</div>
                        <input type="text" ref="confirmPassword"/>
                    </div>
                    <LoadingButton text="确认修改" loadingText="正在为您保存..." status={this.state.isSaving}
                                   onClick={() => this.handleSave()}/>
                    <div className="modify-msg" onClick={() => this.handleSwitch()}>手机短信验证修改</div>
                </div>
                <div className="modify-password-p">
                    <div className="modify-title-container">
                        <div className="image">
                            <img src={require("password_light")}/>
                        </div>
                        <div className="title">登陆密码</div>
                    </div>
                    <div className="input-base">
                        <div className="label">手机号码</div>
                        <input type="text" ref="phone" value={this.props.phone}/>
                    </div>
                    <div className="input-base">
                        <div className="label">短信验证码</div>
                        <input type="text" ref="code"/>
                        <CountDown text="获取短信验证码"/>
                    </div>
                    <LoadingButton text="下一步" loadingText="正在为您保存..." status={this.state.isSaving}
                                   onClick={() => this.handleNext()}/>
                    <div className="modify-msg" onClick={() => this.handleSwitch()}>手机密码修改</div>
                </div>

            </div>

        );
    }
}


ModifyPassword.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        phone: state.userInfoReducer.phone /*微信号码*/
    }
}

export default connect(mapStateToProps)(ModifyPassword);