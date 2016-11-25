import React, {Component} from 'react';
import {Link} from 'react-router'
import './success.scss'
import {RouteTransition, presets} from 'react-router-transition';

class Success extends React.Component{

    constructor(props){
        super(props);
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
                    <Link to="/checkin/ticket" className="success-page-link">完成并关闭</Link>
                </div>
            </RouteTransition>
        )
    }
}
export default Success;
