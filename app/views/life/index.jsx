import React from 'react';
import './index.scss'

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timeInterval: 60 * 1000
        };
    }

    componentDidMount() {
        this.startRotate(50);
    }

    /*
    * @param funcInterval 毫秒单位
    * */
    startRotate(funcInterval) {
        const self = this;
        var switcher = false;
        var musicDegTotal = 0;
        var semiCicleDegTotal = 0;
        const deg = funcInterval * 360 / this.state.timeInterval;
        const interval = setInterval(function () {
            semiCicleDegTotal = semiCicleDegTotal + deg;
            musicDegTotal = musicDegTotal + deg;
            const selector = !switcher ? ".life-index-pie-container-progress-left" : ".life-index-pie-container-progress-right";
            self.rotate(selector, semiCicleDegTotal);
            self.rotate(".life-index-pie-container-music-flag",musicDegTotal);
            self.rotate(".music",-musicDegTotal);
            if (semiCicleDegTotal >= 180) {
                switcher = true;
                semiCicleDegTotal = 0;
                $(".life-index-pie-container-progress-right").show();
                if(musicDegTotal >= 360){
                    $(".life-index-pie-container-progress-left").css("z-index",7);
                    clearInterval(interval);
                    self.reset();
                }
            }
        }, funcInterval);
    }

    rotate(selector, degree) {
        $(selector).css("-o-transform", "rotate(" + degree + "deg)");
        $(selector).css("-moz-transform", "rotate(" + degree + "deg)");
        $(selector).css("-webkit-transform", "rotate(" + degree + "deg)");
    }

    reset(){
        this.rotate(".life-index-pie-container-music-flag",0);
        this.rotate(".life-index-pie-container-progress-left",0);
        this.rotate(".life-index-pie-container-progress-right",0);
        $(".life-index-pie-container-alarm-flag").css("z-index",8);
    }

    render() {
        return (
            <div className="life-index">
                <div className="life-index-pie-container">
                    <div className="life-index-pie-container-lock"></div>
                    <div className="life-index-pie-container-right"></div>
                    <div className="life-index-pie-container-left"></div>
                    <div className="life-index-pie-container-music-flag">
                        <div className="music"></div>
                    </div>
                    <div className="life-index-pie-container-alarm-flag"></div>
                    <div className="life-index-pie-container-progress-right"></div>
                    <div className="life-index-pie-container-progress-left"></div>
                </div>
            </div>
        );
    }
}

export default Index;