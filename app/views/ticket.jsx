import React, {Component} from 'react';

import QRCode from 'qrcode.react';
import {Link} from 'react-router'
import '../assets/stylesheets/app.scss';
import './ticket.scss'
import {RouteTransition, presets} from 'react-router-transition';

class Ticket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: "成都市武侯区香格里拉酒店2楼",
            size: 320
        };
    }

    componentDidMount() {
        const self = this;
        var middle_total_height = $(".ticket-card-middle").height();
        var qrcodeHeight = middle_total_height - 38 - 88;
        var qrcodeElement = document.getElementsByClassName("ticket-card-middle-qrcode")[0];
        $(qrcodeElement).height(qrcodeHeight);
        $(qrcodeElement).width($(qrcodeElement).height());
        console.info(qrcodeHeight);
        self.setState({size: $(".qr-container").height()});
    }

    render() {
        var self = this;
        return (
            <RouteTransition
                component={false}
                style={{width:"100%",height:"100%"}}
                pathname={this.props.location.pathname}
                {...presets.fade}>
                <div className="ticket">
                    <div className="ticket-card">
                        <div className="ticket-card-top">
                            <div className="ticket-card-top-logo"></div>
                            <div className="ticket-card-top-username">静心</div>
                            <div className="ticket-card-top-address">
                                <img src={require("../assets/images/location_light.png")}/>
                                <span>{self.state.address}</span>
                                <img src={require("../assets/images/arrow_right.png")}/>
                            </div>
                            <div className="ticket-card-top-date">2016/12/12 09:30</div>
                        </div>
                        <div className="ticket-card-middle">
                            <div className="ticket-sicircle-top-left"></div>
                            <div className="ticket-sicircle-top-right"></div>
                            <div className="ticket-card-middle-title">活动当日您可凭此券入场签到</div>
                            <div className="ticket-card-middle-qrcode">
                                <div className="qr-container">
                                    <QRCode level='H' value={this.props.params.code} size={self.state.size}/>
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
            </RouteTransition>
        );
    }

}

export default Ticket;
