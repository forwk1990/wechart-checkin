import React from 'react';
import './vipCenter.scss';

class VipCenterCell extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="vip-center-cell" onClick={() => this.props.onClick()}>
                <div className="vip-center-cell-image">
                    <img src={this.props.imageUrl}/>
                </div>
                <div className="vip-center-cell-content">
                    <div className="vip-center-cell-content-title">{this.props.title}</div>
                    <div className="vip-center-cell-content-indicator"></div>
                </div>
            </div>
        );
    }
}

class VipCenter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="vip-center">
                <div className="vip-center-header">

                </div>
                <div className="vip-center-banner">
                    <div className="vip-center-banner-title">堂主特权</div>
                </div>
                <div className="vip-center-list">
                    <VipCenterCell imageUrl={require('invite')} title="邀请朋友"/>
                </div>
            </div>
        );
    }

}

export default VipCenter;