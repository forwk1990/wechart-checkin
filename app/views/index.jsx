/**
 * Created by Itachi
 * on 2016-10-20.
 */

import React, {Component} from 'react';
import FastClick from 'fastclick';
import {createForm} from 'rc-form';
import {Flex, NavBar, Icon, InputItem, Picker, List} from 'antd-mobile';
import DataStore from 'DataStore'
import QueryString from 'query-string'
import {RouteTransition, presets} from 'react-router-transition';

import './index.scss';
import LoadingButton from 'loadingButton';

const AgeRange = [
    {
        value: "1",
        label: "20岁以下"
    },
    {
        value: "2",
        label: "21-30岁"
    },
    {
        value: "3",
        label: "31-40岁"
    },
    {
        value: "4",
        label: "41-50岁"
    },
    {
        value: "5",
        label: "51-60岁"
    }
];

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'inputValue_name': '',
            'inputValue_phone': '',
            'inputValue_ageGroup': [],
            'isReady': false,
            'openId': '',
            'title': '',
            'imageUrl': '',
            'subTitle': '',
            'address': '',
            'date': '',
            'desc': '',
            'checkin_status': 0,
            'activityId':''
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
        const queryParameters = QueryString.parse(location.search);
        //console.log(queryParameters);
        // var queryString = QueryString.extract("http://www.ldted.com/checkin/index.html?code=003E8gop0XsQQq1wgNmp0aLcop0E8go3&state=activityId=111");
        // var queryItems = QueryString.parse(queryString);
        // const code = queryItems["code"];
        // const activityId = QueryString.parse(queryItems["state"])["activityId"];
        // if (!code || !activityId)return;
        // const id = this.props.params.id;
        // if(!id) return;
        if(!queryParameters.id) return;

        self.setState({'activityId':queryParameters.id});
        /*
         * 获取首页显示的信息
         * */
        DataStore.getActivityInfo({id: queryParameters.id}).then(function (responseObject) {
            self.setState({...responseObject, 'isReady': true});
        }, function (error) {
            console.info(error);
        });
    }

    static contextTypes = {
        router: React.PropTypes.object
    }

    handleSubmit() {
        const self = this;
        const name = this.state.inputValue_name;
        const phone = this.state.inputValue_phone;
        const ageGroup = this.state.inputValue_ageGroup;

        if (!name || !ageGroup || phone.length < 1) {

        } else {
            this.setState({checkin_status:1});
            DataStore.checkin({
                name:name,
                ageGroup:ageGroup[0],
                phone:phone,
                id:'1'
            }).then(function (responseObject) {
                self.setState({checkin_status:0});
                self.context.router.push(`ticket/${responseObject.qrCode}`);
            });
        }
    }

    handleChange(name, val) {
        const inputValueObject = {};
        inputValueObject[name] = val;
        this.setState(inputValueObject);
        name == "inputValue_ageGroup" && $(".am-list-extra").addClass("normal-input-font-style");
    }

    render() {
        var self = this;
        const {getFieldProps} = this.props.form;
        return !this.state.isReady ? (<div className="loading"></div>)
                : (
                <RouteTransition
                    component={false}
                    pathname={this.props.location.pathname}
                    {...presets.fade}>
                    <div className="index">
                        <div className="header">
                            <div className="desc">
                                <span>{self.state.title}</span>
                                <span>{self.state.subTitle}</span>
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
                            <InputItem style={{paddingLeft: "0px", textAlign: "right"}} {...getFieldProps('name')}
                                       value={this.state.inputValue_name} maxLength="10"
                                       onChange={ (val) => self.handleChange('inputValue_name', val)}>姓名</InputItem>
                            <Picker style={{fontSize: "24px"}} cols={1} extra="因条件限制，活动攒不接待60岁以上学员" data={AgeRange}
                                    title="请选择年龄段" {...getFieldProps('age')}
                                    value={this.state.inputValue_ageGroup}
                                    onChange={ (val) => self.handleChange('inputValue_ageGroup', val)}>
                                <List.Item style={{paddingLeft: "0px"}} arrow="horizontal">年龄</List.Item>
                            </Picker>
                            <InputItem style={{paddingLeft: "0px", textAlign: "right"}} type="number" maxLength={11}
                                       {...getFieldProps('phone')} value={this.state.inputValue_phone}
                                       onChange={ (val) => self.handleChange('inputValue_phone', val)}>手机号</InputItem>
                        </List>
                        <LoadingButton text="报名领取参与券" loadingText="领取中..." status={this.state.checkin_status} onClick={()=>this.handleSubmit()}/>
                        <Flex/>
                    </div>
                </RouteTransition>
            );
    }
}

export default createForm()(Index);
// <span className="checkin-link" onClick={this.handleSubmit.bind(this)}>
//                             {
//                                 this.state.checkin_status == 0
//                                     ? "报名领取参与券"
//                                     :(
//                                     <div>
//                                         <div className="link-loading"></div>
//                                         <div className="link-text">领取中</div>
//                                     </div>
//                                 )
//                             }
//                         </span>
