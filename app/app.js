
/**
 * Created by Itachi
 * on 2016-10-20.
 */

import React,{Component} from 'react';
import FastClick from 'fastclick';
import {Flex, NavBar, Icon } from 'antd-mobile';

import "./assets/stylesheets/foundation.min.css"
import './assets/stylesheets/app.scss';

class App extends React.Component{

    constructor(props){
        super(props);
        this.state =  {
        };
    }

    componentDidMount(){
        FastClick.attach(document.body);
    }

    render() {
        return (
            <div id="container">
                <div className="header">
                    <div className="desc">
                        <span>静心</span>
                        <span>成都养生协会国学交流论坛</span>
                    </div>
                    <div className="logo">
                        <img src={require("./assets/images/loading-progress.png")}/>
                    </div>
                </div>
                <div className="address">
                    <img src={require("./assets/images/location_back.png")}/>
                    <span>成都市武侯区香格里拉酒店2楼</span>
                    <img src={require("./assets/images/arrow_right.png")}/>
                </div>
                <span className="date">2016/12/12 09:30</span>
                <p className="content">
                    这是一场分享如何平复自己心灵，学会静心养身的交流会。我们邀请了知名的国学大师：错红酒来为我们分享中国古文学中静气
                    灵神的经验。
                </p>
                <Flex/>
            </div>
        );
    }
}

export default App
