import React, {Component} from 'react';
import {Link} from 'react-router'
import './success.scss'

function Success(props) {
    return (
        <div className="success-page">
            <div className="success-page-image"></div>
            <div className="success-page-title">您的资料已提交</div>
            <div className="success-page-thanks">感谢您对我们的信任与支持 </div>
            <Link to="/checkin/edit" className="success-page-link">返回查看参与券</Link>
        </div>
    )
}

export default Success
