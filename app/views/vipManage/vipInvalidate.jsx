
import React from 'react';
import './vipInvalidate.scss';
import LoadingButton from 'loadingButton';

class VipInvalidate extends React.Component{

    constructor(props){
        super(props);
    }

    handleClick(){

    }

    render(){
        return (
            <div className="vip-invalidate">
                <div className="vip-invalidate-tip">
                    <div className="image"></div>
                    <div className="title">该邀请码已失效!</div>
                </div>
                <div className="vip-invalidate-msg first">请联系您的邀请人 万小武</div>
                <div className="vip-invalidate-msg second">获取最新邀请码</div>
                <div className="vip-invalidate-finish" onClick={() => this.handleClick()}>
                    完成
                </div>
            </div>
        );
    }

}

export default VipInvalidate;