import React from 'react';
import './vipCenter.scss';
import {connect} from 'react-redux';
import {MessageBox} from 'Utils';

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

    handleClick() {
        if(!this.props.name){
            MessageBox.show("您还未实名认证哦");
        }else{
            this.context.router.push('vipTicket');
        }
    }

    componentDidMount(){
        if(!this.props.id || this.props.level !== 3){
            this.context.router.replace(`mine/archive`);
        }
    }

    render() {
        const {imageUrl, name}  = this.props;
        const logoImageUrl = !imageUrl ? require('logo') : imageUrl;
        return (
            <div className="vip-center">
                <div className="vip-center-header">
                    <div className="logo-area">
                        <img src={logoImageUrl}/>
                        <div className="logo-area-badge">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;堂主</div>
                    </div>
                    <div className="name">{name}</div>
                </div>
                <div className="vip-center-banner">
                    <div className="vip-center-banner-title">堂主特权</div>
                </div>
                <div className="vip-center-list">
                    <VipCenterCell imageUrl={require('invite')} title="邀请朋友" onClick={ () => this.handleClick() }/>
                </div>
            </div>
        );
    }

}

VipCenter.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        id: state.userInfoReducer.id,
        imageUrl: state.userInfoReducer.imageUrl,
        name: state.userInfoReducer.name,
        level: state.userInfoReducer.level
    };
}

export default connect(mapStateToProps)(VipCenter);