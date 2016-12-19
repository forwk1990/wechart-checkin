import React from 'react';
import './vipCenter.scss';
import {connect} from 'react-redux';

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
        const {imageUrl,name}  = this.props;
        const logoImageUrl = !imageUrl ? require('logo') : imageUrl;
        return (
            <div className="vip-center">
                <div className="vip-center-header">
                    <img src={logoImageUrl}/>
                    <div className=""></div>
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

const mapStateToProps = (state) => {
    return {
        id: state.userInfoReducer.id,
        imageUrl: state.userInfoReducer.imageUrl,
        name: state.userInfoReducer.name
    };
}

export default connect(mapStateToProps)(VipCenter);