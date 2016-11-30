/**
 * Created by Itachi
 * on 2016-10-20.
 */

import React, {Component} from 'react';
import FastClick from 'fastclick';
import {Flex, InputItem, Picker, List} from 'antd-mobile';
import DataStore from 'DataStore'
import QueryString from 'query-string'
import {RouteTransition, presets} from 'react-router-transition';
import {connect} from 'react-redux';
import {MessageBox} from 'Utils';
import ActionTypes from 'constants/ActionTypes';

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
        if (!queryParameters.id) return;

        /*
         * 获取首页显示的信息
         * */
        self.props.dispatch((dispatch) => {
            dispatch({type: ActionTypes.getActivityBefore});
            return DataStore.getActivityInfo({id: queryParameters.id});
        }).then(function (responseObject) {
            self.props.dispatch({type: ActionTypes.getActivity, responseObject});
            self.props.dispatch({type: ActionTypes.getActivityAfter});
        }, function (error) {
            console.info(error);
        });
    }

    handleSubmit() {
        const self = this;
        const name = this.state.inputValue_name;
        const phone = this.state.inputValue_phone;
        const ageGroup = this.state.inputValue_ageGroup;

        if (!name) {
            MessageBox.show('您还未填写姓名');
            return;
        }
        if (ageGroup.length < 1) {
            MessageBox.show('您还未选择年龄');
            return;
        }
        if (!phone) {
            MessageBox.show('您还未填写手机号');
            return;
        } else if (!(/^1[34578]\d{9}$/.test(phone))) {
            MessageBox.show('手机号格式不正确!');
            return;
        }

        const queryParameters = QueryString.parse(location.search);
        if (!queryParameters.id) return;
        self.props.dispatch((dispatch) => {
            dispatch({type: ActionTypes.checkInBefore});
            return DataStore.checkin({
                id: queryParameters.id,
                name: name,
                ageGroup: ageGroup[0],
                phone: phone
            });
        }).then(function (responseObject) {
            self.props.dispatch({type: ActionTypes.checkIn, responseObject});
            self.context.router.push(`ticket/${responseObject.qrCode}/${responseObject.shortCode}/${responseObject.isExt}`);
            self.props.dispatch({type: ActionTypes.checkInAfter,phone:phone});
        }, function (error) {
            console.info(error);
        });
    }

    handleChange(name, val) {
        const inputValueObject = {};
        inputValueObject[name] = val;
        this.setState(inputValueObject);
        name == "inputValue_ageGroup" && $(".am-list-extra").addClass("normal-input-font-style");
    }

    handleMap() {
        window.location.href = window.location.origin + `/wx/map.html?lat=${this.props.lat}&lng=${this.props.lng}`;
    }

    render() {
        var self = this;
        const {isReady, title, subTitle, imageUrl, address, date, desc, loading} = this.props;
        return !isReady ? (<div className="loading"></div>)
            : (
            <RouteTransition
                component={false}
                pathname={this.props.location.pathname}
                {...presets.fade}>
                <div className="index">
                    <div className="index-img"></div>
                    <div className="content">
                        <div className="address" onClick={this.handleMap.bind(this)}>
                            <img src={require("../assets/images/location_back.png")}/>
                            <span>{address}</span>
                            <img src={require("../assets/images/arrow_right.png")}/>
                        </div>
                        <span className="date">{date}</span>
                        <div className="topline"></div>
                        <List style={{marginTop:"10px"}}>
                            <InputItem style={{paddingLeft: "0px", textAlign: "right"}}
                                       value={this.state.inputValue_name} maxLength="10"
                                       onChange={ (val) => self.handleChange('inputValue_name', val)}>姓名</InputItem>
                            <Picker style={{fontSize: "24px"}} cols={1} extra="活动暂不接待60岁以上学员" data={AgeRange}
                                    title="请选择年龄段"
                                    value={this.state.inputValue_ageGroup}
                                    onChange={ (val) => self.handleChange('inputValue_ageGroup', val)}>
                                <List.Item style={{paddingLeft: "0px"}} arrow="horizontal">年龄</List.Item>
                            </Picker>
                            <InputItem style={{paddingLeft: "0px", textAlign: "right"}} type="number" maxLength={11}
                                       value={this.state.inputValue_phone}
                                       onChange={ (val) => self.handleChange('inputValue_phone', val)}>手机号</InputItem>
                        </List>
                        <LoadingButton text="报名领取参与券" loadingText="领取中..." status={loading}
                                       onClick={() => this.handleSubmit()}/>
                    </div>
                    <Flex/>
                </div>
            </RouteTransition>
        );
    }
}

Index.contextTypes = {
    router: React.PropTypes.object
}


const mapStateToProps = (state) => {
    return {
        isReady: state.getActivityReducer.isReady,
        title: state.getActivityReducer.title,
        lng: state.getActivityReducer.lng,
        lat: state.getActivityReducer.lat,
        imageUrl: state.getActivityReducer.imageUrl,
        subTitle: state.getActivityReducer.subTitle,
        address: state.getActivityReducer.address,
        date: state.getActivityReducer.date,
        desc: state.getActivityReducer.desc,
        activityId: state.getActivityReducer.activityId,
        loading: state.checkInReducer.loading,
        qrCode: state.checkInReducer.qrCode,
        isExt:state.checkInReducer.checkInReducer
    }
}

export default connect(mapStateToProps)(Index);
