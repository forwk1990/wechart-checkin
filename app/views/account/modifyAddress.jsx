import React from 'react'
import {connect} from 'react-redux';
import {Picker} from 'antd-mobile';
import LoadingButton from 'loadingButton';
import './modifyAddress.scss'

class ModifyAddress extends React.Component {

    constructor(props) {
        super(props);
        const date = new Date(Date.parse(props.birthday));
        this.state = {
            birthdayData: this._getYearMonthDayData(),
            loading: 0,
            monthDate: props.birthday ? [date.getFullYear(), date.getMonth() + 1, date.getDate()] : [1980,1,1],
            hasInitialValue: props.birthday ? true : false
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
        console.info(yearArray);
        return yearArray;
    }

    handleChange(val) {
        console.info(val);
        this.setState({monthDate: val, hasInitialValue: true});
    }

    formatValueWithZero(value) {
        return value < 10 ? `0${value}` : `${value}`;
    }

    render() {
        return (
            <div className="modify-address">
                <div className="modify-title-container">
                    <div className="image">
                        <img src={require("address_light")}/>
                    </div>
                    <div className="title">联系地址</div>
                </div>
                <Picker style={{fontSize: "24px"}} cols={3}
                        data={this.state.birthdayData}
                        title="选择省市区" value={this.state.monthDate}
                        onChange={ (val) => this.handleChange(val)}>
                    <div className="modify-address-picker-item">
                        <div className="title">选择省市区</div>
                        {
                            !this.state.hasInitialValue ? (<div className="extra"></div>) : (<div className="extra">{`${this.state.monthDate[0]}-${this.formatValueWithZero(this.state.monthDate[1])}-${this.formatValueWithZero(this.state.monthDate[2])}`}</div>)
                        }
                        <img src={require("../../assets/images/arrow_right.png")}/>
                    </div>
                </Picker>
                <div className="input-base">
                    <div className="label">详细地址</div>
                    <input type="text" ref="detail"/>
                </div>
                <LoadingButton text="保存" loadingText="正在为您保存..." status={this.state.isSaving}
                               onClick={() => this.handleSave()}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        address: state.userInfoReducer.address /*微信号码*/
    }
}

export default connect(mapStateToProps)(ModifyAddress);