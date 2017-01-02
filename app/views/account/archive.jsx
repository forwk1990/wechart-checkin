import React from 'react';
import {connect} from 'react-redux';
import DataStore from 'DataStore';
import QRCodeModal from 'QRCodeModal'
import ActionTypes from 'constants/ActionTypes';
import {MessageBox, WxManager} from 'Utils';
import {Vip} from 'Utils';
import './archive.scss';
import TableCell from 'tableCell';


class Archive extends React.Component {

    constructor(props) {
        super(props);
        this.state = {visible: false}
    }

    componentDidMount() {
        if (!this.props.id) {
            this.context.router.push(`login/${"archive"}`);
        } else {
            document.setTitle("我的喜悦");
            if (!this.props.openId) this.setState({visible: true})
            wx && wx.ready(function () {
                WxManager.shareAllWithOption(WxManager.archiveShareOptions())
            })
            return;
        }
    }

    onClose() {
        this.setState({
            visible: false,
        });
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
        const {imageUrl, nickname, level, range, totalScore} = this.props;
        const logoImageUrl = !imageUrl ? require('logo') : imageUrl;
        return (
            <div className="profile">
                <div className="profile-header" style={{
                    background: `url(${require('profileBackground')}) center center no-repeat`,
                    backgroundSize: 'cover'
                }}>
                    <div className="profile-header-base">
                        <div className="profile-header-base-side">
                            <div className="profile-header-base-side-image"
                                 onClick={() => level == 3 && this.handleNavigate("mine/vipCenter")}>
                                <img src={require('会员')}/>
                            </div>
                            <div className="profile-header-base-side-text">{Vip.getNameFromLevel(level)}</div>
                        </div>
                        <div className="profile-header-base-center" onClick={() => this.handleChooseImage()}>
                            <img src={logoImageUrl}/>
                        </div>
                        <div className="profile-header-base-side">
                            <div className="profile-header-base-side-image"
                                 onClick={() => this.handleNavigate("mine/integral")}>
                                <img src={require('排名icon')}/>
                            </div>
                            <div className="profile-header-base-side-text">排名{range}</div>
                        </div>
                    </div>
                    <div className="profile-header-nickname">{nickname}</div>
                    <div className="profile-header-nl">
                        <div className="profile-header-nl-text">我的能量&nbsp;{totalScore}</div>
                    </div>
                </div>
                <div className="profile-banner"></div>
                <div className="profile-list">
                    <TableCell imageUrl={require("我的资料")} title="我的资料" m
                               extra="" onClick={() => this.handleNavigate("mine/profile")}/>
                    <TableCell imageUrl={require("我的活动")} title="我的活动"
                               extra="" onClick={() => this.handleNavigate("mine/activity")}/>
                    <TableCell imageUrl={require("我的捐赠")} title="我的捐赠" extra=""
                               onClick={() => this.handleNavigate("donate")}/>
                    <TableCell imageUrl={require("我的反馈")} title="我的反馈" extra=""
                               onClick={() => this.handleNavigate("feedback")}/>
                </div>
                {this.state.visible && (<QRCodeModal onClose={() => this.onClose()}/>)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.userInfoReducer.id,
        nickname: state.userInfoReducer.nickname,
        level: state.userInfoReducer.level,
        range: state.userInfoReducer.range,
        openId: state.userInfoReducer.openId,
        totalScore: state.userInfoReducer.totalScore,
        imageUrl: state.userInfoReducer.imageUrl
    }
}

Archive.contextTypes = {
    router: React.PropTypes.object
}

export default connect(mapStateToProps)(Archive);