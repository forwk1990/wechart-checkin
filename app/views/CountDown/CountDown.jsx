import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import './CountDown.scss'

import LoadingBar from '../LoadingBar/LoadingBar.jsx';


class CountDown extends Component{

    constructor(props){
        super(props);
        this.state = {
            day:"0",
            hours:"0",
            minutes:"0",
            seconds:"0"
        };
    }

    /*
    * 当组件装载到 DOM上后，启动定时器，开始倒计时
    * */
    componentDidMount(){
        // 截止日期转化为秒
        const deadlineSeconds = Date.parse(this.props.deadline) * 0.001;

        // 当前日期转化为秒
        var currentSeconds = Date.parse(new Date()) * 0.001;

        // 设置当前截止日期
        const self = this;
        this.timer = setInterval(function () {
            const diffSeconds = deadlineSeconds - (currentSeconds++);
            self.setFullDate(diffSeconds);
            if(diffSeconds <= 0){
                clearInterval(self.timer);
            }
        }.bind(this), 1000);
    }

    /*
    * 根据时间值，获取格式化后的时间字符串
    * */
    getFormatString(value){
        var str = "";
        if(value <= 0){
            str = "00";
        }
        if(value > 0 && value < 10){
            str = "0" + value;
        }
        if(value >=10 && value < 100){
            str = value + "";
        }
        return str;
    }

    setFullDate(totalSeconds){
        if(!totalSeconds) return 0;

        var day = 0,
            hours = 0,
            minutes = 0,
            seconds = 0;

        if(totalSeconds >= 24 * 3600){
            day = parseInt(totalSeconds / (24 * 3600));
            totalSeconds = totalSeconds % (24 * 3600);
        }
        if(totalSeconds >= 3600){
            hours = parseInt(totalSeconds / 3600);
            totalSeconds = totalSeconds % 3600;
        }
        if(totalSeconds >= 60){
            minutes = parseInt(totalSeconds / 60);
            totalSeconds = totalSeconds % 60;
        }
        if(totalSeconds > 0){
            seconds = totalSeconds;
            totalSeconds = totalSeconds % (24 * 3600);
        }
        this.setState({
            day:this.getFormatString(day),
            hours:this.getFormatString(hours),
            minutes:this.getFormatString(minutes),
            seconds:this.getFormatString(seconds)
        });
    }

    render(){
        var self = this;

        const titleItems = ['剩余天','时','分','秒'].map(function(title){
            return (
                <div key={title} className="small-3 columns cd-column cd-column-title">
                    {title}
                </div>
            );
        });

        const valueItems = ['day','hours','minutes','seconds'].map(function(propertyName){
            return (
                <div key={propertyName} className="small-3 columns cd-column cd-column-value">
                    {self.state[propertyName]}
                </div>
            );
        });

        return (
            <div>
                <div className="row cd-row">
                    {titleItems}
                </div>
                <div className="row cd-row">
                    {valueItems}
                </div>
                <LoadingBar name={"xxxxxx"} price={15600} originalPrice={18000}/>
            </div>
        );

        //return (
        //    <div className="row count-down">
        //        <div className="small-3 columns">
        //            <div className="row">
        //                <div className="small-12 columns padding-clear">
        //                    <span className="count-down-title">剩余天</span>
        //                </div>
        //                <div className="small-12 columns padding-clear">
        //                    <span className="count-down-value">{this.state.day}</span>
        //                </div>
        //            </div>
        //        </div>
        //        <div className="small-3 columns">
        //            <div className="row">
        //                <div className="small-12 columns padding-clear">
        //                    <span className="count-down-title">时</span>
        //                </div>
        //                <div className="small-12 columns padding-clear">
        //                    <span className="count-down-value">{this.state.hours}</span>
        //                </div>
        //            </div>
        //        </div>
        //        <div className="small-3 columns">
        //            <div className="row">
        //                <div className="small-12 columns padding-clear">
        //                    <span className="count-down-title">分</span>
        //                </div>
        //                <div className="small-12 columns padding-clear">
        //                    <span className="count-down-value">{this.state.minutes}</span>
        //                </div>
        //            </div>
        //        </div>
        //        <div className="small-3 columns">
        //            <div className="row">
        //                <div className="small-12 columns padding-clear">
        //                    <span className="count-down-title">秒</span>
        //                </div>
        //                <div className="small-12 columns padding-clear">
        //                    <span className="count-down-value">{this.state.seconds}</span>
        //                </div>
        //            </div>
        //        </div>
        //    </div>
        //);
    }

}


CountDown.propTypes = {
    dateString : React.PropTypes.string
}

function appState(state){
    return {
        isConfirmDisplay:state.isConfirmDisplay
    }
}


export default CountDown;
