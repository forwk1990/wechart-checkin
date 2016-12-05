import React from 'react';
import './index.scss'
import {Carousel} from 'antd-mobile';
import DataStore from 'DataStore'
import QueryString from 'query-string'

class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timeInterval: 15 * 60 * 1000,
            isStart: false,
            isShowMessage: false
        };
        this.isTimerStart = false;
    }

    componentDidMount() {
        const height = $(document).height() - 260 * 2 / window.devicePixelRatio;
        $(".life-clock").height(height);
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
            const selector = !switcher ? ".life-clock-pie-container-progress-left" : ".life-clock-pie-container-progress-right";
            self.rotate(selector, semiCicleDegTotal);
            self.rotate(".life-clock-pie-container-music-flag", musicDegTotal);
            self.rotate(".music", -musicDegTotal);
            if (semiCicleDegTotal >= 180) {
                switcher = true;
                semiCicleDegTotal = 0;
                $(".life-clock-pie-container-progress-right").show();
                $(".life-clock-pie-container-alarm-flag").css("z-index", 9);
                if (musicDegTotal >= 360) {
                    $(".life-clock-pie-container-progress-left").css("z-index", 7);
                    clearInterval(interval);
                    self.setState({isShowMessage: true});
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
        this.rotate(".life-clock-pie-container-music-flag", 0);
        this.rotate(".life-clock-pie-container-progress-left", 0);
        this.rotate(".life-clock-pie-container-progress-right", 0);
    }

    getCurrentTime() {
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
            this.startRotate(15);
            this.isTimerStart = true;
        }

        this.props.audios.forEach(function (audio, index) {
            const audioElement = document.getElementById(`life-audio-${index}`);
            if (!isStart) {
                audioElement.play();
            } else {
                audioElement.pause();
            }
        })
    }

    render() {

        return (
            <div className="life-clock">
                <div className="life-clock-pie-container">
                    <div className="life-clock-pie-container-lock">
                        {
                            this.getCurrentTime()
                        }
                    </div>
                    <div className="life-clock-pie-container-right"></div>
                    <div className="life-clock-pie-container-left"></div>
                    <div className="life-clock-pie-container-music-flag">
                        <div className="music"></div>
                    </div>
                    <div className="life-clock-pie-container-alarm-flag"></div>
                    <div className="life-clock-pie-container-progress-right"></div>
                    <div className="life-clock-pie-container-progress-left"></div>
                </div>
                {do{
                    if(!this.state.isShowMessage){
                    (<div className="life-clock-start-pause" onClick={ () => this.handleClick()}>
                    {
                        this.state.isStart ? (<div className="pause"></div>)
                            : (<div className="start"></div>)
                    }
                    </div>)
                }else{
                    (<div className="life-clock-message">本次正念活动结束</div>)
                }
                }
                }
                {
                    this.props.audios.map(function (audio, index) {
                        return (
                            <div className="life-clock-audio" key={index}>
                                <audio id={`life-audio-${index}`} loop="true">
                                    Your browser does not support the <code>audio</code> element.
                                    <source src={audio}/>
                                </audio>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

class Lyrics extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const height = $(document).height();
        $(".life-lyrics").height(height);
    }

    render() {
        return (
            <div className="life-lyrics">
                <div className="life-lyrics-content" dangerouslySetInnerHTML={{__html:this.props.text}} >
                </div>
            </div>
        );
    }
}

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            audios: [],
            text: ""
        };
    }

    componentDidMount() {
        const self = this;

        const type = self.props.params.type;
        if(type == 1 || type == 2 || type == 3){
            // 获取生命吃走睡
            DataStore.getLife({type: type}).then(function (responseObject) {
                document.title = responseObject.title;
                self.setState({isReady: true, audios: responseObject.audios, text: responseObject.text});
            }, function () {

            });
        }else{

        }
    }

    render() {
        return !this.state.isReady ? (<div className="loading"></div>)
            : (
            <div className="life-index">
                <div className="life-index-announce">
                    <div className="life-index-announce-img"></div>
                    <div className="life-index-announce-text">本次正念结束您将获得<span>120</span>积分</div>
                </div>
                <Carousel dots={false} style={{height: "100%"}}>
                    <Clock audios={this.state.audios}></Clock>
                    <Lyrics text={this.state.text}></Lyrics>
                </Carousel>
            </div>
        );
    }

}

export default Index;