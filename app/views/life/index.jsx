import React from 'react';
import './index.scss'
import {Carousel, Modal} from 'antd-mobile';
import DataStore from 'DataStore'
import {connect} from 'react-redux';
import {MessageBox, Validator} from 'Utils';
import LoginModal from 'LoginModal';

class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timeInterval: 15 * 60 * 1000,
            isStart: false,
            isShowMessage: false
        };
        this.isTimerStart = false;
        this.isNotify = false;
    }

    componentDidMount() {
        const height = $(document).height();
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

    notifyComplete() {
        if (this.isNotify)return;
        this.isNotify = true;
        DataStore.notifyComplete({id: this.props.id, type: this.props.type});
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
                        {this.props.type == 2 && (<div className="music"
                                                       style={{background: `url(${require('sit')}) top center no-repeat`,backgroundSize:'cover'}}></div>)}
                        {this.props.type == 1 && (<div className="music"
                                                       style={{background: `url(${require('walk')}) top center no-repeat`,backgroundSize:'cover'}}>
                            {this.state.isStart && (<div className="walking"></div>)}
                        </div>)}
                        {this.props.type == 3 && (<div className="music"
                                                       style={{background: `url(${require('dinner')}) top center no-repeat`,backgroundSize:'cover'}}></div>)}
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
        console.log("lyrics height:", height);
        $(".life-lyrics").height(height);
    }

    render() {
        return (
            <div className="life-lyrics">
                <div className="life-lyrics-content" dangerouslySetInnerHTML={{__html: this.props.text}}>
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
            isOpen:0,
            annouce:"",
            text: "",
            visible: false,
            integral: '--'
        };
    }

    componentDidMount() {
        const self = this;
        const type = self.props.params.type;
        if (type == 1 || type == 2 || type == 3) {

            if (type == 1) {
                document.title = "喜悦行走";
                this.setState({annouce:"喜悦行走,健康生活"});
            }
            if (type == 2) {
                document.title = "喜悦静坐";
                this.setState({annouce:"喜悦静坐,健康生活"});
            }
            if (type == 3) {
                document.title = "喜悦用餐";
                this.setState({annouce:"喜悦用餐,健康生活"});
            }

            // 获取生命吃走睡
            DataStore.getLife({type: parseInt(type)}).then(function (responseObject) {
                self.setState({
                    isReady: true,
                    isOpen:responseObject.isOpen,
                    audios: responseObject.audios,
                    text: responseObject.text,
                    integral: responseObject.integral
                });
            }, function (error) {
                MessageBox.show(error.message);
            });
        } else {
            self.context.router.replace('notfound');
        }
    }

    /*
     *登陆
     * */
    handleLogin() {
        this.setState({
            visible: true,
        });
    }

    onClose() {
        this.setState({
            visible: false,
        });
    }

    render() {
        const {id} = this.props;
        var announceHtml;
        if(this.state.isOpen){
            announceHtml = id ? (
                <div className="life-index-announce-text">
                    本次正念结束您将获得<span>{this.state.integral}</span>能量
                </div>
            ) : (
                <div className="life-index-announce-text">您还未<span>登陆</span>，本次活动将无法获得能量</div>
            );
        }else{
            announceHtml = (
                <div className="life-index-announce-text">
                    {this.state.annouce}
                </div>
            );
        }
        return !this.state.isReady ? (<div className="loading"></div>)
            : (
            <div>
                <div className="life-index">
                    <div className="life-index-announce" onClick={() => !id && this.state.isOpen && this.handleLogin()}>
                        <div className="life-index-announce-img"></div>
                        {announceHtml}
                    </div>
                    <Carousel style={{height: "100%"}}>
                        <Clock audios={this.state.audios} type={this.props.params.type} id={id}></Clock>
                        <Lyrics text={this.state.text}></Lyrics>
                    </Carousel>
                </div>
                {this.state.visible && (<LoginModal onClose={() => this.onClose()}/>)}
            </div>
        );
    }
}

Index.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        id: state.userInfoReducer.id /*用户ID*/
    };
}

export default connect(mapStateToProps)(Index);