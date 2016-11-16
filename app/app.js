/**
 * Created by Itachi
 * on 2016-10-20.
 */

import React,{Component} from 'react';
import FastClick from 'fastclick';
import { createForm } from 'rc-form';
import {Flex, NavBar, Icon, InputItem, Picker, List} from 'antd-mobile';

import "./assets/stylesheets/foundation.min.css"
import './assets/stylesheets/app.scss';

const district = [
    {
        value:"34000",
        label:"20岁以下"
    },
    {
        value:"34001",
        label:"21-30岁"
    },
    {
        value:"34002",
        label:"31-40岁"
    },
    {
        value:"34003",
        label:"41-50岁"
    },
    {
        value:"34004",
        label:"51-60岁"
    }
];

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        FastClick.attach(document.body);
    }

    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
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

                <div className="topline"></div>
                <List style={{fontSize:"24px"}}>
                    <Picker style={{fontSize:"24px"}} cols={1} extra="因条件限制，活动攒不接待60岁以上学员" data={district} title="请选择年龄段"
                        {...getFieldProps('district')}
                        >
                        <List.Item style={{paddingLeft:"0px"}} arrow="horizontal">年龄</List.Item>
                    </Picker>
                </List>
                <Flex/>
            </div>
        );
    }
}

export default createForm()(App);
