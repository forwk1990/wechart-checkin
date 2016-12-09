import React from 'react'
import {connect} from 'react-redux';
import {Picker} from 'antd-mobile';
import './modifyBirthday.scss'
import {MessageBox} from 'Utils';
import DataStore from 'DataStore';
import ActionTypes from 'constants/ActionTypes';

class ModifyBirthday extends React.Component {

    constructor(props) {
        super(props);
        const date = new Date(Date.parse(props.birthday));
        this.state = {
            birthdayData: this._getYearMonthDayData(),
            loading: 0,
            monthDate: props.birthday ? [date.getFullYear(), date.getMonth() + 1, date.getDate()] : [1980, 1, 1],
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


    formatValueWithZero(value) {
        return value < 10 ? `0${value}` : `${value}`;
    }

    handleChange(val) {
        this.setState({monthDate: val, hasInitialValue: true});

        const value = `${val[0]}/${val[1]}/${val[2]}`;
        const self = this;
        this.setState({isSaving: true});
        DataStore.modifyBirthday({id: this.props.id, birthday: value}).then(function () {
            self.setState({isSaving: false});
            self.props.dispatch({type: ActionTypes.modifyBirthday, birthday: value});
        }, function (error) {
            self.setState({isSaving: false});
            MessageBox.show(error);
        });
    }

    render() {
        return (
            <div className="modify-birthday">
                <div className="modify-title-container">
                    <div className="image">
                        <img src={require("birthday_light")}/>
                    </div>
                    <div className="title">出生日期</div>
                </div>
                <Picker style={{fontSize: "24px"}} cols={3}
                        data={this.state.birthdayData}
                        title="出生日期" value={this.state.monthDate}
                        onChange={ (val) => this.handleChange(val)}>
                    <div className="modify-birthday-picker-item">
                        <div className="title">出生日期</div>
                        {
                            !this.state.hasInitialValue ? (<div className="extra"></div>) : (<div
                                className="extra">{`${this.state.monthDate[0]}-${this.formatValueWithZero(this.state.monthDate[1])}-${this.formatValueWithZero(this.state.monthDate[2])}`}</div>)
                        }
                        <img src={require("../../assets/images/arrow_right.png")}/>
                    </div>
                </Picker>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.userInfoReducer.id,
        birthday: state.userInfoReducer.birthday /*微信号码*/
    }
}

export default connect(mapStateToProps)(ModifyBirthday);