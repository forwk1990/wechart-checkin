import React from 'react';
import './index.scss'
import {Carousel, Modal} from 'antd-mobile';
import DataStore from 'DataStore'
import {connect} from 'react-redux';
import {MessageBox, Validator, WxManager} from 'Utils';
import LoginModal from 'LoginModal';


class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timeInterval: props.time * 60 * 1000,
            // timeInterval: 0.5 * 60 * 1000,
            isStart: false,
            isShowMessage: false
        };
        this.isTimerStart = false;
        this.isNotify = false;
        this.interval = null;
    }

    componentDidMount() {
        const height = $(document).height();
        $(".life-clock").height(height);
        // 配置网易云音乐
        this.configNejAudio()
    }

    /*
     * 配置网易音乐
     * */
    configNejAudio() {
        if (this.props.audios.length < 1)return;
        var f = function () {
            var _ = NEJ.P,
                _u = _('nej.ui'),
                __playList = [this.props.audios[0]];
            var page = {
                _$init: function () {
                    var _mp3 = _u._$$MP3Player._$allocate({
                        parent: 'box',
                        mode: 0,
                        autostart: 0,
                        list: __playList
                    });
                }
            }
            page._$init();
        };
        define(['{lib}ui/audio/mp3.js'], f);
    }

    /*
     * @param funcInterval 毫秒单位
     * */
    startRotate(funcInterval) {
        const self = this;
        // 是否切换到右半圆
        var switcher = true;
        var musicDegTotal = 0;
        var semiCicleDegTotal = 0;
        const deg = funcInterval * 360 / this.state.timeInterval;
        this.interval = setInterval(function () {
            if (!self.state.isStart) return;
            semiCicleDegTotal = semiCicleDegTotal + deg;
            musicDegTotal = musicDegTotal + deg;
            const selector = !switcher ? ".life-clock-pie-container-progress-left" : ".life-clock-pie-container-progress-right";
            self.rotate(selector, semiCicleDegTotal);
            self.rotate(".life-clock-pie-container-music-flag", musicDegTotal);
            self.rotate(".music", -musicDegTotal);
            if (semiCicleDegTotal >= 180) {
                switcher = !switcher;
                semiCicleDegTotal = 0;
                $(".life-clock-pie-container-left").show();
                $(".life-clock-pie-container-right").css("z-index", 8);
                $(".life-clock-pie-container-alarm-flag").css("z-index", 9);
            }
            const timeInterval = self.state.timeInterval - funcInterval;
            if (timeInterval > 0) {
                self.setState({timeInterval: timeInterval});
            } else {
                self.setState({timeInterval: 0, isShowMessage: true});
            }
            if (360 * 0.95 <= musicDegTotal) {
                self.notifyComplete();
            }
            if (musicDegTotal >= 360) {
                clearInterval(self.interval);
                // self.playMusicToggle(true);
                //self.playAlarm();
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

    confirmResult() {

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
        if (!this.props.id)return;
        if (!this.props.shouldIntegral)return;
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
        this.playMusicToggle(isStart);
    }

    playMusicToggle(isStart) {
        const self = this;
        this.props.audios.forEach(function (audio, index) {
            if (self.props.audios.length > 1 && index == self.props.audios.length - 1) return;
            const audioElement = self.refs[`life-audio-${index}`];
            if (!isStart) {
                audioElement.play();
            } else {
                audioElement.pause();
            }
        })
    }

    playAlarm() {
        if (this.props.audios.length <= 1) return;
        const audioElement = this.refs[`life-audio-${this.props.audios.length - 1}`];
        audioElement.play();
    }

    render() {
        const self = this;
        if (self.props.stop) {
            clearInterval(self.interval);
        }
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
                        {this.props.type == 1 && (<div className="music"
                                                       style={{
                                                           background: `url(${require('午休静图')}) top center no-repeat`,
                                                           backgroundSize: 'cover'
                                                       }}>
                            {this.state.isStart && (<div className="wxing"></div>)}
                        </div>)}
                        {this.props.type == 2 && (<div className="music"
                                                       style={{
                                                           background: `url(${require('walk')}) top center no-repeat`,
                                                           backgroundSize: 'cover'
                                                       }}>
                            {this.state.isStart && (<div className="walking"></div>)}
                        </div>)}
                        {this.props.type == 3 && (<div className="music"
                                                       style={{
                                                           background: `url(${require('walk')}) top center no-repeat`,
                                                           backgroundSize: 'cover'
                                                       }}>
                            {this.state.isStart && (<div className="walking"></div>)}
                        </div>)}
                        {this.props.type == 4 && (<div className="music"
                                                       style={{
                                                           background: `url(${require('睡觉静图')}) top center no-repeat`,
                                                           backgroundSize: 'cover'
                                                       }}>
                            {this.state.isStart && (<div className="sjing"></div>)}
                        </div>)}
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
                <div id="box"></div>
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

class Life extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            audios: [],
            isOpen: 0,
            annouce: "",
            text: "",
            visible: false,
            stop: 0,
            integral: '--'
        };
    }

    componentDidMount() {
        const self = this;
        const type = self.props.params.type;
        // 获取生命吃走睡
        DataStore.getLife({type: parseInt(type)}).then(function (responseObject) {
            self.setState({
                isReady: true,
                isOpen: responseObject.isOpen,
                audios: responseObject.audios,
                token: responseObject.token,
                text: responseObject.text,
                integral: responseObject.integral,
                annouce: `${document.title},健康生活`
            });
            WxManager.shareAllWithOption({title: document.title, desc: `${document.title},健康生活`})
        }, function (error) {
            MessageBox.show(error.message);
        });
        if (!this.props.openId) this.setState({visible: true})
    }

    componentWillMount() {
        this.context.router.setRouteLeaveHook(
            this.props.route,
            () => this.routeWillLeave()
        )
    }

    routeWillLeave() {
        this.setState({stop: 1});
        return true;
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
        if (this.state.isOpen) {
            announceHtml = id ? (
                <div className="life-index-announce-text">
                    本次正念结束您将获得<span>{this.state.integral}</span>能量
                </div>
            ) : (
                <div className="life-index-announce-text">您还未<span>登陆</span>，本次活动将无法获得能量</div>
            );
        } else {
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
                        <Clock audios={this.state.audios} shouldIntegral={this.state.isOpen} stop={this.state.stop}
                               type={this.props.params.type} id={id} time={this.props.params.time}></Clock>
                        <Lyrics text={this.state.text}></Lyrics>
                    </Carousel>
                </div>
                {this.state.visible && (<LoginModal onClose={() => this.onClose()}/>)}
            </div>
        );
    }
}

Life.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        id: state.userInfoReducer.id, /*用户ID*/
        openId: state.userInfoReducer.openId
    };
}


const LifeWrapper = connect(mapStateToProps)(Life)

class LifeIndex extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick(type, title, time) {
        document.setTitle(title);
        this.context.router.push(`life/${type + 1}/${encodeURI(title)}/${time}`);
    }

    componentDidMount() {
        document.setTitle("正念训练");
        wx && wx.ready(function () {
            WxManager.shareAllWithOption(WxManager.exerciseShareOptions())
        })
    }

    render() {
        const items = [
            {
                title: "正念静坐",
                desc: "深度休息 恢复精力",
                time: 20,
                imageUrl: require('午休背景图')
            },
            {
                title: "正念行走",
                desc: "放松身心 连接自然",
                time: 16,
                imageUrl: require('行走图')
            },
            {
                title: "正念散步",
                desc: "安住当下 舒缓情绪",
                time: 11,
                imageUrl: require('散步图')
            },
            {
                title: "正念睡眠",
                desc: "告别失眠 安然入睡",
                time: 19.5,
                imageUrl: require('入睡图')
            }
        ]
        const self = this;
        return (
            <div className="life-list-wrapper">
                <div className="life-list-wrapper-header"></div>
                <div className="life-list">
                    {
                        items.map(function (item, index) {
                            return (
                                <div onClick={() => self.handleClick(index, item.title, item.time)}
                                     className="life-list-item"
                                     key={index} style={{
                                    background: `url(${item.imageUrl}) center center no-repeat`,
                                    backgroundSize: 'cover'
                                }}>
                                    <div className="life-list-item-title">{item.title}</div>
                                    <div className="life-list-item-desc">{item.desc}</div>
                                    <div className="life-list-item-time">{item.time}分钟</div>
                                </div>
                            )
                        })
                    }
                    <div className="life-list-msg">
                        一大波免费语音指导 正在来袭 敬请期待
                    </div>
                </div>
            </div>
        );
    }
}

LifeIndex.contextTypes = {
    router: React.PropTypes.object
}

export {LifeIndex, LifeWrapper} ;