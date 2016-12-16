import React from 'react';
import {connect} from 'react-redux';
import {Formatter} from 'Utils'
import {MessageBox} from 'Utils';
import DataStore from 'DataStore';
import ActionTypes from 'constants/ActionTypes';
import './archive.scss';

class ArchiveCell extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="archive-cell" onClick={() => this.props.onClick()}>
                <div className="archive-cell-image">
                    <img src={this.props.imageUrl}/>
                </div>
                <div className="archive-cell-title">{this.props.title}</div>
                {
                    this.props.value ? (<div className="archive-cell-value text-overflow">{this.props.value}</div>) : (
                        <div className="archive-cell-extra">{this.props.extra}</div>)
                }
                <div className="archive-cell-indicator"></div>
            </div>
        );
    }
}


class Archive extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        if (!this.props.id) {
            this.context.router.push(`login/${"archive"}`);
        }else{
            document.title = "我的资料";
            return;
        }
    }


    handleNavigate(path) {
        this.context.router.push(path);
    }

    handleChooseImage() {
        const self = this;
        /*选取图像*/
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds;
                console.info(localIds, res);
                if (localIds && localIds.length == 1) {
                    wx.uploadImage({
                        localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            var serverId = res.serverId;
                            console.info(serverId);
                            DataStore.modifyImageUrl({
                                id: self.props.id,
                                mediaId: serverId
                            }).then(function (responseObject) {
                                self.props.dispatch({type: ActionTypes.modifyImageUrl, responseObject});
                            }, function (error) {
                                MessageBox.show(error.message);
                            });
                        }
                    });
                }
            }
        });
    }

    render() {
        const {imageUrl, nickname, phone, email, birthday, address, IDNumber, password, payPassword, wx,provinceLabel} = this.props;
        const logoImageUrl = !imageUrl ? require('logo') : imageUrl;
        return (
            <div className="archive">
                <div className="archive-header">
                    <div className="archive-header-left">
                        <div className="username">{nickname}</div>
                        <div className="modify" onClick={() => this.handleNavigate("mine/modifyNickname")}>修改昵称</div>
                    </div>
                    <div className="archive-header-logo" onClick={ () => this.handleChooseImage()}>
                        <img src={logoImageUrl}/>
                    </div>
                </div>
                <div className="archive-list">
                    <ArchiveCell imageUrl={require("phone_dark")} value={Formatter.encryptionPhone(phone)} title="联系手机"
                                 extra="未绑定" onClick={() => this.handleNavigate("mine/modifyPhone")}/>
                    <ArchiveCell imageUrl={require("email_dark")} value={email} title="联系邮箱" extra="未设置"
                                 onClick={() => this.handleNavigate("mine/modifyMail")}/>
                    <ArchiveCell imageUrl={require("wx_dark")} value={wx} title="联系微信" extra="未绑定"
                                 onClick={() => this.handleNavigate("mine/modifyWx")}/>
                    <ArchiveCell imageUrl={require("birthday_dark")} value={birthday} title="生日日期" extra="未设置"
                                 onClick={() => this.handleNavigate("mine/modifyBirthday")}/>
                    <ArchiveCell imageUrl={require("address_dark")} value={`${provinceLabel}${address}`} title="联系地址" extra="未设置"
                                 onClick={() => this.handleNavigate("mine/modifyAddress")}/>
                    <ArchiveCell imageUrl={require("sm_dark")} value={IDNumber ? '已认证' : ''} title="实名认证" extra="未认证"
                                 onClick={() => this.handleNavigate("mine/modifyId")}/>
                    <ArchiveCell imageUrl={require("password_dark")} value={password ? "修改" : ''} title="登录密码"
                                 extra="未设置"
                                 onClick={() => password ? this.handleNavigate("mine/modifyPassword") : this.handleNavigate("mine/modifyPasswordConfirm")}/>
                    <ArchiveCell imageUrl={require("paypassword_dark")} value={payPassword ? '修改' : ''} title="支付密码"
                                 extra="未设置"
                                 onClick={() => payPassword ? this.handleNavigate("mine/modifyPayPassword") : this.handleNavigate("mine/modifyPayPasswordConfirm")}/>
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
        provinceLabel:state.userInfoReducer.provinceLabel,
        id: state.userInfoReducer.id,
        nickname: state.userInfoReducer.nickname, /*用户昵称*/
        phone: state.userInfoReducer.phone, /*手机号码*/
        email: state.userInfoReducer.email, /*邮箱*/
        birthday: state.userInfoReducer.birthday, /*生日*/
        address: state.userInfoReducer.address, /*联系地址*/
        name: state.userInfoReducer.name, /*真实姓名*/
        IDNumber: state.userInfoReducer.IDNumber, /*身份正好*/
        password: state.userInfoReducer.password, /*md5格式,做自动登陆*/
        payPassword: state.userInfoReducer.payPassword, /*是否设置支付密码*/
        wx: state.userInfoReducer.wx, /*微信号码*/
    }
}

export default connect(mapStateToProps)(Archive);