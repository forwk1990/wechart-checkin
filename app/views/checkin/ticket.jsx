import React, {Component} from 'react';

import QRCode from 'qrcode.react';
import {Link} from 'react-router';
import QueryString from 'query-string'
import '../../assets/stylesheets/app.scss';
import './ticket.scss';
import DataStore from 'DataStore'
import ActionTypes from 'constants/ActionTypes';
import {connect} from 'react-redux';

class Ticket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: 320
        };
    }

    componentDidMount() {
        const qrCodeHeight = $(".ticket-card-middle").height() - 38 - 88;
        $(".ticket-card-middle-qrcode").width(qrCodeHeight).height(qrCodeHeight);
        this.setState({size: $(".qr-container").height()});
        document.setTitle("我的入场券");
    }

    handleMap() {
        const self = this;
        wx.getLocation({
            type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                window.location.href = window.location.origin + `/${__SERVER_RELATIVE_FOLDER}/map.html?lat=${self.props.lat}&lng=${self.props.lng}&t=${Math.random()}&clat=${latitude}&clng=${longitude}`;
            },
            fail:function (res) {
                alert(res);
            }
        });
    }

    render() {
        const self = this;
        var {title, address, date, isReady,isExistGroup} = self.props;
        const queryParameters = QueryString.parse(location.search);
        if (!title) {
            title = "加载中...";
            if (!queryParameters.id) return;
            self.props.dispatch((dispatch) => {
                dispatch({type: ActionTypes.getActivityBefore});
                return DataStore.getActivityInfo({id: queryParameters.id});
            }).then(function (responseObject) {
                self.props.dispatch({type: ActionTypes.getActivity, responseObject});
                self.props.dispatch({type: ActionTypes.getActivityAfter});
            }, function (error) {
                console.info(error);
            });
        }
        const imgUrl = require("logo");
        return (
            <div className="ticket">
                <div className="ticket-card">
                    <div className="ticket-card-top">
                        <div className="ticket-card-top-logo" style={{backgroundImage: `url(${imgUrl})`}}></div>
                        <div className="ticket-card-top-username">{title}</div>
                        {isReady && (
                            <div className="ticket-card-top-address" onClick={this.handleMap.bind(this)}>
                                <img src={require("location_light")}/>
                                <span className="text-overflow">{address}</span>
                                <img src={require("arrow_right")}/>
                            </div>)}
                        <div className="ticket-card-top-date">{date}</div>
                    </div>
                    <div className="ticket-card-middle">
                        <div className="ticket-sicircle-top-left"></div>
                        <div className="ticket-sicircle-top-right"></div>
                        <div className="ticket-card-middle-title">活动当日您可凭此券入场</div>
                        <div className="ticket-card-middle-qrcode">
                            <div className="qr-container">
                                <QRCode level='H' value={`${window.location.origin}${window.location.pathname}#/validate/${this.props.params.code}`}
                                        size={self.state.size}/>
                            </div>
                        </div>
                        <div className="ticket-sicircle-bottom-left"></div>
                        <div className="ticket-sicircle-bottom-right"></div>
                    </div>
                    <div className="ticket-card-bottom">
                        { parseInt(self.props.params.isExt) ? (
                            <div className="ticket-card-bottom-container-center">
                                <Link to={`activityGroup/${queryParameters.id}`} className="ticket-card-bottom-container-center-group">立即加入活动群</Link>
                            </div>
                        ) : (
                            <div className="ticket-card-bottom-container-between">
                                <Link to={`activityGroup/${queryParameters.id}`} className="ticket-card-bottom-container-between-group">立即加入活动群</Link>
                                <div className="ticket-card-bottom-container-between-fix">
                                    <Link to={`edit/${self.props.params.code}`} className="ticket-card-bottom-link">完善个人资料 获专业服务</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="ticket-remark">
                    您可在公众号 个人中心 我的活动 查看此券
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        isReady: state.getActivityReducer.isReady,
        title: state.getActivityReducer.title,
        imageUrl: state.getActivityReducer.imageUrl,
        lng: state.getActivityReducer.lng,
        lat: state.getActivityReducer.lat,
        isExistGroup:state.getActivityReducer.isExistGroup == 1,
        address: state.getActivityReducer.address,
        date: state.getActivityReducer.activeTime,
        isExt: state.checkInReducer.isExt,
        shortUrl: state.checkInReducer.shortUrl
    }
}

export default connect(mapStateToProps)(Ticket);
