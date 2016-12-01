import React from 'react';
import {Popup, InputItem, Picker, List} from 'antd-mobile';
import LoadingButton from '../loadingButton'
import {connect} from 'react-redux';
import './sysIndex.scss';
import DataStore from 'DataStore'
import {MessageBox} from 'Utils';
import ActionTypes from 'constants/ActionTypes';

class SysIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            yearMonthDadyData: this._getYearMonthDayData(),
            loading: 0,
            monthDate: [1980, 1, 1],
            selected: false
        }
    }

    _getYearMonthDayData() {
        var yearArray = [];
        const currentYear = new Date().getFullYear();
        for (var year = currentYear; year > currentYear - 60; year--) {
            var yearObject = {label: `${year}`, value: year, id: 'year', children: []};
            for (var month = 1; month <= 12; month++) {
                const monthStr = month < 10 ? `0${month}` : month;
                var monthObject = {label: `${monthStr}`, value: month, id: "month", children: []};
                var maxDay = 30;
                if (month == 1 || month == 3 || month == 5
                    || month == 7 || month == 8 || month == 10 || month == 12) {
                    maxDay = 31;
                }
                if (month == 2) {
                    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                        maxDay = 29;
                    } else {
                        maxDay = 29;
                    }
                }
                for (var day = 1; day <= maxDay; day++) {
                    const dayStr = day < 10 ? `0${day}` : day;
                    monthObject.children.push({label: `${dayStr}`, value: day, id: "day"});
                }
                yearObject.children.push(monthObject);
            }
            yearArray.push(yearObject);
        }
        return yearArray;
    }

    handleSubmit() {
        const self = this;
        const monthDate = this.state.monthDate;
        if (monthDate.length < 1) {
            MessageBox.show("请选择您的出生日期");
            return;
        }
        /*
         * 获取首页显示的信息
         * */
        self.props.dispatch(() => {
            self.setState({loading: 1});
            return DataStore.getExplain({birthday: monthDate.join('')});
        }).then(function (responseObject) {
            self.setState({loading: 0});
            self.props.dispatch({type: ActionTypes.getExplain, responseObject});
            self.context.router.push('sysValue');
        }, function (error) {
            self.setState({loading: 0});
            console.info(error);
        });
    }

    handleChange(val) {
        this.setState({monthDate: val, selected: true});
    }

    formatValueWithZero(value) {
        return value < 10 ? `0${value}` : `${value}`;
    }

    render() {
        console.info(Popup);
        return (
            <div className="sys-index">
                <div className="sys-index-top">
                    <div className="sys-index-top-container">
                        <div className="sys-index-top-container-sm"></div>
                        <div className="sys-index-top-container-sy"></div>
                    </div>
                </div>
                <Picker style={{fontSize: "24px"}} cols={3}
                        data={this.state.yearMonthDadyData}
                        title="出生日期" value={this.state.monthDate}
                        onChange={ (val) => this.handleChange(val)}>
                    <div className="sys-index-picker-item">
                        {
                            !this.state.selected ? (<span>选择您的出生日期</span>)
                                : (
                                <span>{`${this.state.monthDate[0]}-${this.formatValueWithZero(this.state.monthDate[1])}-${this.formatValueWithZero(this.state.monthDate[2])}`}</span>)
                        }
                        <img src={require("../../assets/images/arrow_right.png")}/>
                    </div>
                </Picker>
                <div className="sys-index-bottom">
                    <LoadingButton text="开始计算生命数" loadingText="计算中..." status={this.state.loading}
                                   onClick={() => this.handleSubmit()}/>
                </div>

            </div>
        );
    }

}

SysIndex.contextTypes = {
    router: React.PropTypes.object
}

export default connect()(SysIndex);