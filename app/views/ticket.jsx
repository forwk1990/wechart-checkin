import React, {Component} from 'react';

import QRCode from 'qrcode.react';
import {Link} from 'react-router';
import QueryString from 'query-string'
import '../assets/stylesheets/app.scss';
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
    }

    render() {
        const self = this;
        var {title, imageUrl, address, date,isReady} = self.props;
        if (!title) {
            title = "加载中...";
            const queryParameters = QueryString.parse(location.search);
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
        console.info(window.location);
        const parentPath = window.location.origin + window.location.pathname + window.location.search
        return (
            <div className="ticket">
                <div className="ticket-card">
                    <div className="ticket-card-top">
                        <div className="ticket-card-top-logo" style={{backgroundImage: `url(${imageUrl})`}}></div>
                        <div className="ticket-card-top-username">{title}</div>
                        {isReady && (
                        <div className="ticket-card-top-address">
                            <img src={require("../assets/images/location_light.png")}/>
                            <span>{address}</span>
                            <img src={require("../assets/images/arrow_right.png")}/>
                        </div>)}
                        <div className="ticket-card-top-date">{date}</div>
                    </div>
                    <div className="ticket-card-middle">
                        <div className="ticket-sicircle-top-left"></div>
                        <div className="ticket-sicircle-top-right"></div>
                        <div className="ticket-card-middle-title">活动当日您可凭此券入场</div>
                        <div className="ticket-card-middle-qrcode">
                            <div className="qr-container">
                                <QRCode level='H' value={`${parentPath}#/validate/${this.props.params.code}`} size={self.state.size}/>
                            </div>
                        </div>
                        <div className="ticket-sicircle-bottom-left"></div>
                        <div className="ticket-sicircle-bottom-right"></div>
                    </div>
                    <div className="ticket-card-bottom">
                        <Link to="edit" className="ticket-card-bottom-link">完善个人资料 获专业服务</Link>
                    </div>
                </div>

                <div className="ticket-remark">
                    您可在公众号 个人中心 我的报名 查看此券
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
        address: state.getActivityReducer.address,
        date: state.getActivityReducer.date,
        activityId: state.getActivityReducer.activityId
    }
}

export default connect(mapStateToProps)(Ticket);
