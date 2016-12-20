import React from 'react';
import './vipExist.scss';

class VipExist extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick(){
        wx.closeWindow();
    }

    render() {
        return (
            <div className="vip-exist">
                <div className="vip-exist-background"></div>
                <div className="vip-exist-big-message">您已经是喜悦高级会员</div>
                <div className="vip-exist-small-message">感谢您对我们的信任与支持</div>
                <div className="vip-exist-finish" onClick={() => this.handleClick()}>
                    完成
                </div>
            </div>
        );
    }

}

export  default VipExist;