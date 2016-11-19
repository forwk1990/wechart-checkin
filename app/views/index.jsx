/**
 * Created by Itachi
 * on 2016-10-20.
 */

import React,{Component} from 'react';
import FastClick from 'fastclick';
import { createForm } from 'rc-form';
import {Flex, NavBar, Icon, InputItem, Picker, List} from 'antd-mobile';
import QueryString from 'query-string'
import DataStore from 'DataStore'
import {Link} from 'react-router'

import './index.scss';

const district = [
    {
        value:"34000",
        label:"20岁以下",
        children:[
            {
                value:"35001",
                label:"21-30岁"
            },
            {
                value:"35002",
                label:"21-30岁"
            }
        ]
    },
    {
        value:"44001",
        label:"21-30岁",
        children:[
            {
                value:"45001",
                label:"xxx"
            },
            {
                value:"45002",
                label:"yyyy"
            }
        ]
    },
    {
        value:"54002",
        label:"31-40岁",
        children:[
            {
                value:"55001",
                label:"gggggg"
            },
            {
                value:"55002",
                label:"bbbbbb"
            }
        ]
    }
];

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'isReady':false,
            'openId':'',
            'username':'',
            'imageUrl':'',
            'activityName':'成都养生协会国学交流论坛',
            'address':'成都市武侯区香格里拉酒店2楼',
            'date':'2016/12/12 09:30',
            'desc':'这是一场分享如何平复自己心灵，学会静心养身的交流会。我们邀请了知名的国学大师：错红酒来为我们分享中国古文学中静气灵神的经验。'
        };
    }

    // 组件加载到DOM中之后调用
    componentDidMount() {
        let self = this;
        /*
         * @reason:
         *  mobile browsers will wait approximately 300ms from the time that you tap the button to fire the click event
         * */
        FastClick.attach(document.body);

        /*
         * 获取查询字符串
         * */
        var queryString = QueryString.extract("http://www.ldted.com/checkin/index.html?code=003E8gop0XsQQq1wgNmp0aLcop0E8go3&state=activityId=111");
        var queryItems = QueryString.parse(queryString);
        const code = queryItems["code"];
        const activityId = QueryString.parse(queryItems["state"])["activityId"];
        if(!code || !activityId)return;

        /*
         * 获取首页显示的信息
         * */
        DataStore.getActivityInfo({code: code, id: activityId}).then(function (responseObject) {
            self.setState({...responseObject, 'isReady':true});
        }, function (error) {
            console.info(error);
        });
    }

    render() {
        var self = this;
        const { getFieldProps } = this.props.form;
        return (
            <div className="index">
                <div className="header">
                    <div className="desc">
                        <span>{self.state.username}</span>
                        <span>{self.state.activityName}</span>
                    </div>
                    <div className="logo">
                        <img src={self.state.imageUrl}/>
                    </div>
                </div>
                <div className="address">
                    <img src={require("../assets/images/location_back.png")}/>
                    <span>{self.state.address}</span>
                    <img src={require("../assets/images/arrow_right.png")}/>
                </div>
                <span className="date">{self.state.date}</span>

                <p className="content">
                    {self.state.desc}
                </p>

                <div className="topline"></div>
                <List>
                    <InputItem style={{paddingLeft:"0px",textAlign:"right"}}
                               {...getFieldProps('control')}>姓名</InputItem>
                    <Picker style={{fontSize:"24px"}} cols={2} extra="因条件限制，活动攒不接待60岁以上学员" data={district} title="请选择年龄段"
                            {...getFieldProps('district')}>
                        <List.Item style={{paddingLeft:"0px"}} arrow="horizontal">年龄</List.Item>
                    </Picker>
                    <InputItem style={{paddingLeft:"0px",textAlign:"right"}}
                               {...getFieldProps('control')}>手机号</InputItem>
                </List>
                <Link to="/checkin/ticket" className="checkin-link">报名领取参与券</Link>
                <Flex/>
            </div>
        );
    }
}

export default createForm()(Index);
