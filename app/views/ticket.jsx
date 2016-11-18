
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import '../assets/stylesheets/app.scss';
import './ticket.scss'

class Ticket extends Component{

    constructor(props){
        super(props);
        this.state = {
            address:"xx"
        };
    }

    render(){
        var self = this;
        return (
            <div className="ticket">
                <div className="ticket-card">
                    <div className="ticket-card-sicircle-top-left"></div>
                    <div className="ticket-card-sicircle-top-right"></div>
                    <div className="ticket-card-sicircle-bottom-left"></div>
                    <div className="ticket-card-sicircle-bottom-right"></div>
                    <div className="ticket-card-top">
                        <div className="ticket-card-top-logo"></div>
                        <div className="ticket-card-top-username"></div>
                        <div className="ticket-card-top-address">
                            <img src={require("../assets/images/location_back.png")}/>
                            <span>{self.state.address}</span>
                            <img src={require("../assets/images/arrow_right.png")}/>
                        </div>
                    </div>
                    <div className="ticket-card-middle">
                        <div className="ticket-card-middle-title">活动当日您可凭此券入场签到</div>
                        <div className="ticket-card-middle-qrcode"></div>
                    </div>
                    <div className="ticket-card-bottom">
                        <a href="#" className="ticket-card-bottom-link">完善个人资料 获专业服务</a>
                    </div>
                </div>
                <div className="ticket-remark">
                    您可在公众号 个人中心 我的报名 查看此券
                </div>
            </div>
        );
    }

}

export default Ticket;
