import React from 'react';
import {Flex, InputItem, Picker, List} from 'antd-mobile';
import LoadingButton from '../loadingButton'
import './sysIndex.scss';

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

class SysIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            yearMonthDadyData: this._getYearMonthDayData()
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

    }

    render() {
        return (
            <div className="sys-index">
                <div className="sys-index-top">
                    <div className="sys-index-top-container">
                        <div className="sys-index-top-container-sm"></div>
                        <div className="sys-index-top-container-sy"></div>
                    </div>
                </div>
                <Picker style={{fontSize: "24px"}} cols={3} data={this.state.yearMonthDadyData}
                        title="出生日期">
                    <div className="sys-index-picker-item">
                        <span>选择您的出生日期</span>
                        <img src={require("../../assets/images/arrow_right.png")}/>
                    </div>
                </Picker>
                <div className="sys-index-bottom">
                    <LoadingButton text="开始计算生命数" loadingText="计算中..." status={0}
                                   onClick={() => this.handleSubmit()}/>
                </div>

            </div>
        );
    }

}

export default SysIndex;