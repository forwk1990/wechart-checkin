

import React from 'react';
import {connect} from 'react-redux';
import './archive.scss';

class ArchiveCell extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="archive-cell" onClick={() => this.props.onClick()}>
                <div className="archive-cell-image">
                    <img src={this.props.imageUrl}/>
                </div>
                <div className="archive-cell-title">{this.props.title}</div>
                {
                    this.props.value ? (<div className="archive-cell-value">{this.props.value}</div>):(<div className="archive-cell-extra">{this.props.extra}</div>)
                }
                <div className="archive-cell-indicator"></div>
            </div>
        );
    }
}


class Archive extends React.Component{

    constructor(props){
        super(props);
    }

    handleNavigate(path){
        this.context.router.push(path);
    }

    render(){
        const {imageUrl,nickname,phone,email,birthday,address,IDNumber,password,isSetPayPassword,wx} = this.props;
        return (
            <div className="archive">
                <div className="archive-header">
                    <div className="archive-header-left">
                        <div className="username">{nickname}</div>
                        <div className="modify" onClick={() => this.handleNavigate("mine/modifyNickname")}>修改昵称</div>
                    </div>
                    <div className="archive-header-logo">
                        <img src={imageUrl}/>
                    </div>
                </div>
                <div className="archive-list">
                    <ArchiveCell imageUrl={require("phone_dark")} value={phone} title="联系手机" extra="未绑定" onClick={() => this.handleNavigate("mine/modifyPhone")}/>
                    <ArchiveCell imageUrl={require("email_dark")} value={email} title="联系邮箱" extra="未设置" onClick={() => this.handleNavigate("mine/modifyMail")}/>
                    <ArchiveCell imageUrl={require("wx_dark")} value={wx} title="联系微信" extra="未绑定" onClick={() => this.handleNavigate("mine/modifyWx")}/>
                    <ArchiveCell imageUrl={require("birthday_dark")} value={birthday} title="生日日期" extra="未设置" onClick={() => this.handleNavigate("mine/modifyBirthday")}/>
                    <ArchiveCell imageUrl={require("address_dark")} value={address} title="联系地址" extra="未设置" onClick={() => this.handleNavigate("mine/modifyAddress")}/>
                    <ArchiveCell imageUrl={require("sm_dark")} value={IDNumber} title="实名认证" extra="未认证" onClick={() => this.handleNavigate("mine/modifyId")}/>
                    <ArchiveCell imageUrl={require("password_dark")} value={password ? "修改" : ''} title="登录密码" extra="未设置" onClick={() => password ? this.handleNavigate("mine/modifyPassword") : this.handleNavigate("mine/modifyPasswordConfirm")}/>
                    <ArchiveCell imageUrl={require("paypassword_dark")} value={isSetPayPassword ? '修改' : ''} title="支付密码" extra="未设置" onClick={() => this.handleNavigate("mine/modifyPayPassword")}/>
                </div>
            </div>
        );
    }
}

Archive.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        imageUrl: state.userInfoReducer.imageUrl,
        id: state.userInfoReducer.id,
        nickname: state.userInfoReducer.nickname, /*用户昵称*/
        phone: state.userInfoReducer.phone, /*手机号码*/
        email: state.userInfoReducer.email, /*邮箱*/
        birthday: state.userInfoReducer.birthday, /*生日*/
        address: state.userInfoReducer.address, /*联系地址*/
        name: state.userInfoReducer.name, /*真实姓名*/
        IDNumber: state.userInfoReducer.IDNumber, /*身份正好*/
        password: state.userInfoReducer.password, /*md5格式,做自动登陆*/
        isSetPayPassword: state.userInfoReducer.isSetPayPassword /*是否设置支付密码*/,
        wx: state.userInfoReducer.wx, /*微信号码*/
    }
}

export default connect(mapStateToProps)(Archive);