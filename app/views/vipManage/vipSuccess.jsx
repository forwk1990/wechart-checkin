import React from 'react';
import '.vipSuccess.scss';

class VipSuccess extends React.Component{

    constructor(props){
        super(props);
    }

    handleClick(){

    }

    render(){
        return (
            <div className="vip-success">
                <div className="vip-success-content">
                    <div className="vip-success-content-background"></div>
                    <div className="vip-success-content-big-message">您还未参加任何活动哦</div>
                    <div className="vip-success-content-small-message">您可在 喜悦互动 喜悦活动 参加活动</div>
                    <LoadingButton text="完成" status={0} onClick={() => this.handleClick()}/>
                </div>
                <div className="vip-success-bottom">
                    <div className="vip-success-bottom-"></div>
                </div>
            </div>
        );
    }

}

export default VipSuccess;