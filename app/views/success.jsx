import React, {Component} from 'react';
import './success.scss'
import {RouteTransition, presets} from 'react-router-transition';

class Success extends React.Component{

    constructor(props){
        super(props);
    }

    handleClick(){
        wx.closeWindow();
    }

    render(){
        return (
            <RouteTransition
                component={false}
                pathname={this.props.location.pathname}
                {...presets.fade}>
                <div className="success-page">
                    <div className="success-page-image"></div>
                    <div className="success-page-title">您的资料已提交</div>
                    <div className="success-page-thanks">感谢您对我们的信任与支持</div>
                    <a className="success-page-link" onClick={this.handleClick.bind(this)}>完成并关闭</a>
                </div>
            </RouteTransition>
        )
    }
}
export default Success;
