import React from 'react';

import QRCode from 'qrcode.react';
import './vipTicket.scss';
import DataStore from 'DataStore'
import {connect} from 'react-redux';

class VipTicket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            size: 300,
            code:''
        };
    }

    componentDidMount() {
        const qrCodeHeight = $(".vip-ticket-card-middle-qrcode").height();
        $(".vip-ticket-card-middle-qrcode").width(qrCodeHeight);
        this.setState({size: qrCodeHeight});
        this.generateInviteCode();
    }

    generateInviteCode(){
        const self = this;
        DataStore.generateInviteCode({id:self.props.id}).then(function (responseObject) {
            if(responseObject.code){
                self.setState({code:responseObject.code});
            }else{

            }
        });
    }

    render() {
        const self = this;
        var {name, imageUrl} = self.props;
        return (
            <div className="vip-ticket">
                <div className="vip-ticket-card">
                    <div className="vip-ticket-card-top">
                        <div className="vip-ticket-card-top-logo" style={{backgroundImage: `url(${imageUrl})`}}></div>
                        <div className="vip-ticket-card-top-username">{name}</div>
                    </div>
                    <div className="vip-ticket-card-middle">
                        <div className="vip-ticket-sicircle-top-left"></div>
                        <div className="vip-ticket-sicircle-top-right"></div>
                        <div className="vip-ticket-card-middle-title">
                            {
                                 this.state.code ? (<span>邀请码:{this.state.code}</span>) : (<span>正在生成邀请码</span>)
                            }
                        </div>
                        <div className="vip-ticket-card-middle-qrcode">
                            <div className="qr-container">
                                {
                                    this.state.code != '' && (<QRCode level='H'
                                                                value={`${window.location.origin}${window.location.pathname}#/vipInvite/${encodeURI(name)}/${this.state.code}`}
                                                                size={this.state.size}/>)
                                }
                            </div>
                        </div>
                        <div className="vip-ticket-card-middle-desc">
                            <span>该邀请码及二维码仅支持1位好友注册</span>
                            <span>请在24小时内完成注册,超时请重新获取</span>
                        </div>
                        <div className="vip-ticket-sicircle-bottom-left"></div>
                        <div className="vip-ticket-sicircle-bottom-right"></div>
                    </div>
                    <div className="vip-ticket-card-bottom">
                        <div className="big">截图此页面发送给朋友</div>
                        <div className="small">您可以 截图 选择朋友 发送图片</div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        id:state.userInfoReducer.id,
        name: state.userInfoReducer.name,
        imageUrl: state.userInfoReducer.imageUrl
    }
}

export default connect(mapStateToProps)(VipTicket);
