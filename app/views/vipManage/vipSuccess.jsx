import React from 'react';
import './vipSuccess.scss';
import QRCode from 'qrcode.react';
import LoadingButton from 'loadingButton';

class VipSuccess extends React.Component{

    constructor(props){
        super(props);
    }

    handleClick(){
        wx.closeWindow();
    }

    render(){
        return (
            <div className="vip-success">
                <div className="vip-success-content">
                    <div className="vip-success-content-background"></div>
                    <div className="vip-success-content-big-message">恭喜成为喜悦高级会员</div>
                    <div className="vip-success-content-small-message">感谢您对我们的信任与支持</div>
                    <LoadingButton text="完成" status={0} onClick={() => this.handleClick()}/>
                </div>
                <div className="vip-success-bottom">
                    <div className="vip-success-bottom-content">
                        <div className="vip-success-bottom-content-qrContainer">
                            <QRCode level='H'
                                    value={`http://weixin.qq.com/r/hTnUzCvEBXZ6rW_v92yX`}
                                    size={200}/>
                        </div>
                        <div className="vip-success-bottom-content-tip">
                            <div className="big-msg">扫码关注'喜悦来了'</div>
                            <div className="small-msg">绑定微信，获取最新信息</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default VipSuccess;