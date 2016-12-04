import React from 'react';
import './index.scss'

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timeInterval: 15 * 60 * 1000,
            isStart: false
        };
        this.isTimerStart = false;
    }

    componentDidMount() {

    }

    /*
     * @param funcInterval 毫秒单位
     * */
    startRotate(funcInterval) {
        const self = this;
        // 是否切换到右半圆
        var switcher = false;
        var musicDegTotal = 0;
        var semiCicleDegTotal = 0;
        const deg = funcInterval * 360 / this.state.timeInterval;
        const interval = setInterval(function () {
            if (!self.state.isStart)return;
            semiCicleDegTotal = semiCicleDegTotal + deg;
            musicDegTotal = musicDegTotal + deg;
            const selector = !switcher ? ".life-index-pie-container-progress-left" : ".life-index-pie-container-progress-right";
            self.rotate(selector, semiCicleDegTotal);
            self.rotate(".life-index-pie-container-music-flag", musicDegTotal);
            self.rotate(".music", -musicDegTotal);
            if (semiCicleDegTotal >= 180) {
                switcher = true;
                semiCicleDegTotal = 0;
                $(".life-index-pie-container-progress-right").show();
                if (musicDegTotal >= 360) {
                    $(".life-index-pie-container-progress-left").css("z-index", 7);
                    clearInterval(interval);
                    self.reset();
                }
            }
            const timeInterval = self.state.timeInterval - funcInterval;
            if (timeInterval > 0) {
                self.setState({timeInterval: timeInterval});
            } else {
                self.setState({timeInterval: 0});
            }
        }, funcInterval);
    }

    /*
    * 将给定选择器对应的DOM元素转动指定角度
    * @param selector jquery选择字符串
    * @param degree 转动的角度
    * */
    rotate(selector, degree) {
        $(selector).css("-o-transform", "rotate(" + degree + "deg)");
        $(selector).css("-moz-transform", "rotate(" + degree + "deg)");
        $(selector).css("-webkit-transform", "rotate(" + degree + "deg)");
    }

    reset() {
        this.rotate(".life-index-pie-container-music-flag", 0);
        this.rotate(".life-index-pie-container-progress-left", 0);
        this.rotate(".life-index-pie-container-progress-right", 0);
        $(".life-index-pie-container-alarm-flag").css("z-index", 9);
    }

    getCurrentTime() {
        console.info(this.state.timeInterval);
        const totalSeconds = this.state.timeInterval * 0.001;
        let minutes = parseInt(totalSeconds / 60);
        let seconds = parseInt(totalSeconds % 60);
        const minuteStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minuteStr}:${secondsStr}`;
    }

    handleClick() {
        let isStart = this.state.isStart;
        this.setState({isStart: !isStart});
        if (!this.isTimerStart) {
            this.startRotate(50);
            this.isTimerStart = true;
        }
    }

    render() {
        return (
            <div className="life-index">
                <div className="life-index-pie-container">
                    <div className="life-index-pie-container-lock">
                        {
                            this.getCurrentTime()
                        }
                    </div>
                    <div className="life-index-pie-container-right"></div>
                    <div className="life-index-pie-container-left"></div>
                    <div className="life-index-pie-container-music-flag">
                        <div className="music"></div>
                    </div>
                    <div className="life-index-pie-container-alarm-flag"></div>
                    <div className="life-index-pie-container-progress-right"></div>
                    <div className="life-index-pie-container-progress-left"></div>
                </div>
                <div className="life-index-start-pause" onClick={ () => this.handleClick()}>
                    {
                        this.state.isStart ? (<div className="pause"></div>)
                            : (<div className="start"></div>)
                    }
                </div>
            </div>
        );
    }
}

export default Index;