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
                        {props.model.index}
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
        this.state = {
            integralDetails: [],
            isRequest: false
        };
        this.pageIndex = 0;
    }

    componentDidMount() {
        this.requestData(0,15);
    }

    requestData(pageIndex, pageSize) {
        const self = this;
        self.setState({isRequest: true});
        DataStore.getIntegralDetail({pageIndex: pageIndex, pageSize: pageSize}).then(function (responseObject) {
            let integrals = self.state.integralDetails;
            Array.prototype.push.apply(integrals, responseObject);
            self.setState({integralDetails: integrals,isRequest: false});
        });
    }

    handleMore() {
        this.pageIndex = this.pageIndex + 1;
        this.requestData(this.pageIndex, 15);
    }

    render() {
        return  (
            <div className="integral-detail">
                {
                    this.state.integralDetails.map(function (integralDetail, index) {
                        return (<IntegralDetailCell model={integralDetail} key={index}/>)
                    })
                }
                <LoadMoreButton text="加载更多" loadingText="正在为您拉取数据..." status={this.state.isRequest}
                                onClick={() => this.handleMore()}/>
            </div>
        );
    }

}

class MoreIntegralInner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRequest: false,
            integrals: []
        };
        this.pageIndex = 0;
    }

    componentDidMount() {
        this.requestData(this.pageIndex, 15)
    }

    requestData(pageIndex, pageSize) {
        const self = this;
        self.setState({isRequest: true});
        DataStore.getIntegralOrder({pageIndex: pageIndex, pageSize: pageSize}).then(function (responseObject) {
            let integrals = self.state.integrals;
            Array.prototype.push.apply(integrals, responseObject);
            self.setState({integrals: integrals, isRequest: false});
        });
    }

    handleMore() {
        this.pageIndex = this.pageIndex + 1;
        this.requestData(this.pageIndex, 15);
    }

    render() {
        const integralModel = {
            imageUrl: this.props.imageUrl,
            name: this.props.name,
            score: this.props.activityScore + this.props.numberScore + this.props.lifeScore,
            index: this.props.range
        }
        return (
            <div className="more-integral">
                <div className="more-integral-cell">
                    <div className="more-integral-cell-index">
                        {integralModel.index}
                    </div>
                    <div className="more-integral-cell-image">
                        <img src={integralModel.imageUrl}/>
                    </div>
                    <div className="more-integral-cell-content">
                        <div className="more-integral-cell-content-text">
                            {integralModel.name}
                        </div>
                        <div className="more-integral-cell-content-score">
                            {integralModel.score}分
                        </div>
                    </div>
                </div>
                {
                    this.state.integrals.map(function (integral, index) {
                        return (<IntegralOrderCommonCell model={integral} key={index}/>)
                    })
                }
                <LoadMoreButton text="加载更多" loadingText="正在为您拉取数据..." status={this.state.isRequest}
                                onClick={() => this.handleMore()}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        imageUrl: state.userInfoReducer.imageUrl,
        activityScore: state.userInfoReducer.activityScore,
        numberScore: state.userInfoReducer.numberScore,
        lifeScore: state.userInfoReducer.lifeScore,
        range: state.userInfoReducer.range,
        id: state.userInfoReducer.id,
        name: state.userInfoReducer.name
    }
}

const MoreIntegral = connect(mapStateToProps)(MoreIntegralInner);

class MyIntegralInner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            integrals: [],
            isRequest: false
        };
    }

    componentDidMount() {
        const self = this;
        if (!this.props.id) {
            this.context.router.push(`login/${"integral"}`);
        } else {
            this.setState({isRequest: true});
            DataStore.getIntegralOrder({pageIndex: 0, pageSize: 5}).then(function (responseObject) {
                self.setState({integrals: responseObject, isRequest: false});
                self.drawPie();
            });
        }
    }

    drawPie() {
        const activityScore = this.props.activityScore;
        const numberScore = this.props.numberScore;
        const lifeScore = this.props.lifeScore;
        const totalScore = activityScore + numberScore + lifeScore;
        if (totalScore == 0) {
            console.info("xxx");
            this.drawArc(0, 2, '#555');
        } else {

            const activityScoreRatio = activityScore / totalScore;
            const numberScoreRatio = numberScore / totalScore;
            const lifeScoreRatio = 1 - activityScoreRatio - numberScoreRatio;
            console.log(activityScoreRatio, numberScoreRatio, lifeScoreRatio);

            this.drawArc(0, lifeScoreRatio * 2, "#D9C3A4"); //#D9C3A4
            this.drawArc(2 * lifeScoreRatio, 2 * (lifeScoreRatio + numberScoreRatio), "#B3A188");//#B3A188
            this.drawArc(2 * (lifeScoreRatio + numberScoreRatio), 2, "#8C7F6B"); //#8C7F6B
        }
    }

    drawArc(from, to, color) {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        var x = 0.5 * canvas.width;
        var y = 0.5 * canvas.height;
        var radius = x - 5;
        var startAngle = (from - 0.5) * Math.PI;
        var endAngle = (to - 0.5) * Math.PI;
        var counterClockwise = false;

        context.beginPath();
        context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
        context.lineWidth = 10;
        context.lineCap = "round"
        context.strokeStyle = color;
        context.stroke();
    }

    handleMore() {
        this.context.router.push("mine/moreIntegral");
    }

    handleDetail() {
        console.info("intergral detail");
        this.context.router.push("mine/integralDetail");
    }

    render() {
        const totalScore = this.props.activityScore + this.props.lifeScore + this.props.numberScore;
        return (
            <div className="m-i">
                <div className="m-i-h">
                    <div className="m-i-h-p-c">
                        <div className="m-i-h-p-c-value">
                            <div className="flag">喜悦积分</div>
                            <div className="value">{totalScore}</div>
                            { totalScore > 0 ? (<div className="indicator">查看详情</div>) : (<div></div>)}
                        </div>
                        <div className="m-i-h-p-c-arc" onClick={() => this.handleDetail()}>
                            <canvas id="myCanvas" width={380 * window.devicePixelRatio / 2 }
                                    height={380 * window.devicePixelRatio / 2 }></canvas>
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
                {
                    this.state.isRequest ? (<div className="m-i-loading"></div>) : (
                        <div className="m-i-order-container">
                            {
                                this.state.integrals.map(function (integral, index) {
                                    return (<IntegralOrderCell model={integral} key={index}/>)
                                })
                            }
                        </div>)
                }
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

const MyIntegral = connect(mapStateToProps)(MyIntegralInner)

export {MoreIntegral, MyIntegral, IntegralDetail};