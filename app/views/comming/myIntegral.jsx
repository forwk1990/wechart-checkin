import React from 'react';
import DataStore from 'DataStore';
import './myIntegral.scss';
import LoadingButton from 'loadingButton';
import LoadMoreButton from 'common/loadMoreButton';
import {connect} from 'react-redux';

const IntegralOrderCell = (props) => {
    return (
        <div className="integral-order-cell">
            <div className="integral-order-cell-image">
                <img src={props.model.imageUrl}/>
            </div>
            <div className="integral-order-cell-content">
                <div className="integral-order-cell-content-text">
                    {props.model.name}
                </div>
                <div className="integral-order-cell-content-score">
                    {props.model.score}分
                </div>
            </div>
        </div>
    );
}

const IntegralOrderCommonCell = (props) => {
    return (
        <div className="integral-order-common-cell">
            {
                props.index == 1 && (<div className="integral-order-common-cell-gold">

                </div>)
            }
            {
                props.index == 2 && (<div className="integral-order-common-cell-silver">

                </div>)
            }
            {
                props.index == 3 && (<div className="integral-order-common-cell-copper">

                </div>)
            }
            {
                props.index !== 1 && props.index !== 2 && props.index !== 3 && (
                    <div className="integral-order-common-cell-index">
                        {props.index}
                    </div>)
            }
            <div className="integral-order-common-cell-image">
                <img src={props.model.imageUrl}/>
            </div>
            <div className="integral-order-common-cell-content">
                <div className="integral-order-common-cell-content-text">
                    {props.model.name}
                </div>
                <div className="integral-order-common-cell-content-score">
                    {props.model.score}分
                </div>
            </div>
        </div>
    );
}

const IntegralDetailCell = (props) => {
    return (
        <div className="integral-detail-cell">
            <div className="integral-detail-cell-title">{props.model.title}</div>
            <div className="integral-detail-cell-score">{props.model.score}分</div>
            <div className="integral-detail-cell-bottom">
                <div className="integral-detail-cell-bottom-date">{props.model.date}</div>
                <div className="integral-detail-cell-bottom-line"></div>
            </div>
        </div>
    );
}

class IntegralDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {integralDetails: []};
    }

    componentDidMount() {
        const self = this;
        DataStore.getIntegralDetail({pageIndex: 0, pageSize: 5}).then(function (responseObject) {
            console.info(responseObject);
            self.setState({integralDetails: responseObject});
        });
    }

    handleMore() {

    }

    render() {
        return (
            <div className="integral-detail">
                {
                    this.state.integralDetails.map(function (integralDetail, index) {
                        return (<IntegralDetailCell model={integralDetail} key={index}/>)
                    })
                }
                <LoadMoreButton text="加载更多" loadingText="数据查询中..." status={0}
                                onClick={() => this.handleMore()}/>
            </div>
        );
    }

}

class MoreIntegral extends React.Component {

    constructor(props) {
        super(props);
        this.state = {integrals: []};
    }

    componentDidMount() {
        const self = this;
        DataStore.getIntegralOrder({pageIndex: 0, pageSize: 5}).then(function (responseObject) {
            console.info(responseObject);
            self.setState({integrals: responseObject});
        });
    }

    render() {
        return (
            <div className="more-integral">
                {
                    this.state.integrals.map(function (integral, index) {
                        return (<IntegralOrderCommonCell model={integral} key={index} index={(index + 1)}/>)
                    })
                }
            </div>
        );
    }

}

class MyIntegralInner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            integrals: []
        };
    }

    componentDidMount() {
        const self = this;
        if (!this.props.id) {
            this.context.router.push(`login/${"integral"}`);
        }else{
            DataStore.getIntegralOrder({pageIndex: 0, pageSize: 5}).then(function (responseObject) {
                console.info(responseObject);
                self.setState({integrals: responseObject});
                self.drawPie();
            });
        }
    }

    drawPie(){
        const activityScore = this.props.activityScore;
        const numberScore = this.props.numberScore;
        const lifeScore = this.props.lifeScore;
        const totalScore = activityScore + numberScore + lifeScore;
        if(totalScore == 0){
            console.info("xxx");
            this.drawArc(0,2,'#555');
        }else{

            const activityScoreRatio = activityScore / totalScore;
            const numberScoreRatio = numberScore / totalScore;
            const lifeScoreRatio = lifeScore / totalScore;
            console.log(activityScoreRatio,numberScoreRatio,lifeScoreRatio);
            this.drawArc(0,2*activityScoreRatio,"#8C7F6B");
            this.drawArc(2*activityScoreRatio,2*(activityScoreRatio+numberScoreRatio),"#B3A188");
            this.drawArc(2*(activityScoreRatio+numberScoreRatio),2,"#D9C3A4");
        }
    }

    drawArc(from,to,color){
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        var x = 0.5 * canvas.width;
        var y = 0.5 * canvas.height;
        var radius = x - 2.5;
        var startAngle = from * Math.PI;
        var endAngle = to * Math.PI;
        var counterClockwise = false;

        context.beginPath();
        context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
        context.lineWidth = 5;
        context.lineCap="round"
        context.strokeStyle = color;
        context.stroke();
    }

    handleMore() {
        this.context.router.push("mine/moreIntegral");
    }

    render() {
        return (
            <div className="m-i">
                <div className="m-i-h">
                    <div className="m-i-h-p-c">
                        <div className="m-i-h-p-c-arc">
                            <canvas id="myCanvas" width={380 *window.devicePixelRatio / 2 } height={380 *window.devicePixelRatio / 2 }></canvas>
                        </div>
                        <div className="m-i-h-p-c-value">
                            <div className="flag">喜悦积分</div>
                            <div className="value">2880</div>
                            <div className="indicator">查看详情</div>
                        </div>
                    </div>
                    <div className="m-i-h-c">
                        <div className="m-i-h-c-activity">
                            <div className="dot"></div>
                            <div className="title">喜悦活动</div>
                        </div>
                        <div className="m-i-h-c-number">
                            <div className="dot"></div>
                            <div className="title">生命数字</div>
                        </div>
                        <div className="m-i-h-c-life">
                            <div className="dot"></div>
                            <div className="title">正念生活</div>
                        </div>
                    </div>
                </div>
                <div className="m-i-banner">
                    <div className="m-i-banner-logo">
                        <img src={this.props.imageUrl}/>
                    </div>
                    <div className="m-i-banner-desc">
                        您当前排名<span>128</span>名
                    </div>
                </div>
                <div className="m-i-section-header">积分排名</div>
                <div className="m-i-order-container">
                    {
                        this.state.integrals.map(function (integral, index) {
                            return (<IntegralOrderCell model={integral} key={index}/>)
                        })
                    }
                </div>
                <div className="m-i-more-container">
                    <LoadingButton text="查看更多排名" loadingText="数据查询中..." status={0}
                                   onClick={() => this.handleMore()}/>
                </div>
            </div>
        );
    }
}

MyIntegralInner.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        imageUrl: state.userInfoReducer.imageUrl,
        activityScore: state.userInfoReducer.activityScore,
        numberScore: state.userInfoReducer.numberScore,
        lifeScore: state.userInfoReducer.lifeScore,
        range: state.userInfoReducer.range,
        id:state.userInfoReducer.id
    }
}

const MyIntegral = connect(mapStateToProps)(MyIntegralInner)

export {MoreIntegral, MyIntegral, IntegralDetail};