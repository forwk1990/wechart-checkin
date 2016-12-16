import React from 'react';
import DataStore from 'DataStore';
import './myIntegral.scss';
import LoadingButton from 'loadingButton';
import LoadMoreButton from 'common/loadMoreButton';
import {connect} from 'react-redux';
import {MessageBox} from 'Utils';

const mapStateToProps = (state) => {
    return {
        imageUrl: state.userInfoReducer.imageUrl,
        activityScore: state.userInfoReducer.activityScore,
        numberScore: state.userInfoReducer.numberScore,
        lifeScore: state.userInfoReducer.lifeScore,
        totalScore: state.userInfoReducer.totalScore,
        range: state.userInfoReducer.range,
        id: state.userInfoReducer.id,
        nickname: state.userInfoReducer.nickname,
        name: state.userInfoReducer.name
    }
}

const IntegralOrderCell = (props) => {
    var backgroundImageUrl = "";
    switch (parseInt(props.model.index)) {
        case 1: {
            backgroundImageUrl = require('star_gold');
            break;
        }
        case 2: {
            backgroundImageUrl = require('star_silver');
            break;
        }
        case 3: {
            backgroundImageUrl = require('star_copper');
            break;
        }
        case 4: {
            backgroundImageUrl = require('4');
            break;
        }
        case 5: {
            backgroundImageUrl = require('5');
            break;
        }
        default:
            break;
    }
    const logoImageUrl = !props.model.imageUrl ? require('logo') : props.model.imageUrl;
    return (
        <div className="integral-order-cell">
            <div className="integral-order-cell-image">
                <img src={logoImageUrl}/>
                <div className="integral-order-cell-image-cover"
                     style={{background: `url(${backgroundImageUrl}) right bottom no-repeat`}}></div>
            </div>
            <div className="integral-order-cell-content">
                <div className="integral-order-cell-content-text">
                    {props.model.name}
                </div>
                <div className="integral-order-cell-content-score">
                    {props.model.score}能量
                </div>
            </div>
        </div>
    );
}

const IntegralOrderCommonCell = (props) => {
    const logoImageUrl = !props.model.imageUrl ? require('logo') : props.model.imageUrl;
    return (
        <div className="integral-order-common-cell">
            {
                props.model.index == 1 && (<div className="integral-order-common-cell-gold">

                </div>)
            }
            {
                props.model.index == 2 && (<div className="integral-order-common-cell-silver">

                </div>)
            }
            {
                props.model.index == 3 && (<div className="integral-order-common-cell-copper">

                </div>)
            }
            {
                props.model.index !== 1 && props.model.index !== 2 && props.model.index !== 3 && (
                    <div className="integral-order-common-cell-index">
                        {props.model.index}
                    </div>)
            }
            <div className="integral-order-common-cell-image">
                <img src={logoImageUrl}/>
            </div>
            <div className="integral-order-common-cell-content">
                <div className="integral-order-common-cell-content-text">
                    {props.model.name}
                </div>
                <div className="integral-order-common-cell-content-score">
                    {props.model.score}能量
                </div>
            </div>
        </div>
    );
}

const IntegralDetailCell = (props) => {
    return (
        <div className="integral-detail-cell">
            <div className="integral-detail-cell-title">{props.model.title}</div>
            <div className="integral-detail-cell-score">{props.model.score}能量</div>
            <div className="integral-detail-cell-bottom">
                <div className="integral-detail-cell-bottom-date">{props.model.date}</div>
                <div className="integral-detail-cell-bottom-line"></div>
            </div>
        </div>
    );
}

class IntegralDetailInner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            integralDetails: [],
            status: 0
        };
        this.pageIndex = 0;
        this.isActive = false;
    }

    componentDidMount() {
        this.requestData(0, 15);
    }

    requestData(pageIndex, pageSize) {
        const self = this;
        self.setState({status: 1});

        DataStore.getIntegralDetail({
            pageIndex: pageIndex,
            pageSize: pageSize,
            id: self.props.id
        }).then(function (responseObject) {
            self.isActive = false;
            let integrals = self.state.integralDetails;
            Array.prototype.push.apply(integrals, responseObject);
            // 未加载到一页数据时切换加载更多按钮
            if (responseObject.length < 15) {
                self.setState({status: -1});
            } else {
                self.setState({status: 0});
            }
            self.setState({integralDetails: integrals});
        });
    }

    handleMore() {
        if (this.isActive) return;
        this.isActive = true;
        this.pageIndex = this.pageIndex + 1;
        this.requestData(this.pageIndex, 15);
    }

    onTouchMove() {
        if (this.state.status == -1)return;
        const height = $(document).height();
        console.info($(".load-more-button").offset().top, $(".load-more-button").height(), height);
        if (($(".load-more-button").offset().top) <= height - 0.5 * $(".load-more-button").height()) {
            this.handleMore();
            console.info("加载页面");
        }
    }

    render() {
        return (
            <div className="integral-detail" onTouchMove={ () => this.onTouchMove()}>
                {
                    this.state.integralDetails.map(function (integralDetail, index) {
                        return (<IntegralDetailCell model={integralDetail} key={index}/>)
                    })
                }
                <LoadMoreButton text="上拉加载更多" loadingText="正在为您拉取数据..." status={this.state.status}
                                onClick={() => this.handleMore()}/>
            </div>
        );
    }

}

const IntegralDetail = connect((state) => {
    return {
        id: state.userInfoReducer.id
    }
})(IntegralDetailInner);

class MoreIntegralInner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            integrals: []
        };
        this.pageIndex = 0;
        this.isActive = false;
    }

    componentDidMount() {
        const self = this;
        this.requestData(this.pageIndex, 15);
    }

    requestData(pageIndex, pageSize) {
        const self = this;
        self.setState({status: 1});
        DataStore.getIntegralOrder({pageIndex: pageIndex, pageSize: pageSize}).then(function (responseObject) {
            self.isActive = false;
            let integrals = self.state.integrals;
            Array.prototype.push.apply(integrals, responseObject);

            // 未加载到一页数据时切换加载更多按钮
            if (responseObject.length < 15) {
                self.setState({status: -1});
            } else {
                self.setState({status: 0});
            }
            self.setState({integrals: integrals});
        });
    }

    handleMore() {
        if (this.isActive) return;
        this.isActive = true;
        this.pageIndex = this.pageIndex + 1;
        this.requestData(this.pageIndex, 15);
    }

    onScroll() {
        console.log("scroll");
    }

    onTouchMove() {
        if (this.state.status == -1)return;
        const height = $(document).height();
        console.info($(".load-more-button").offset().top, $(".load-more-button").height(), height);
        if (($(".load-more-button").offset().top) <= height - 0.5 * $(".load-more-button").height()) {
            this.handleMore();
            console.info("加载页面");
        }
    }

    render() {
        const integralModel = {
            imageUrl: this.props.imageUrl,
            name: this.props.nickname,
            score: this.props.activityScore + this.props.numberScore + this.props.lifeScore,
            index: this.props.range
        }
        const logoImageUrl = !integralModel.imageUrl ? require('logo') : integralModel.imageUrl;
        return (
            <div className="more-integral" onScroll={ () => this.onScroll()} onTouchMove={ () => this.onTouchMove()}>
                <div className="more-integral-cell">
                    <div className="more-integral-cell-index">
                        {integralModel.index}
                    </div>
                    <div className="more-integral-cell-image">
                        <img src={logoImageUrl}/>
                    </div>
                    <div className="more-integral-cell-content">
                        <div className="more-integral-cell-content-text">
                            {integralModel.name}
                        </div>
                        <div className="more-integral-cell-content-score">
                            {integralModel.score}能量
                        </div>
                    </div>
                </div>
                {
                    this.state.integrals.map(function (integral, index) {
                        return (<IntegralOrderCommonCell model={integral} key={index}/>)
                    })
                }
                <LoadMoreButton ref="loadMore" text="上拉加载更多" loadingText="正在为您拉取数据..."
                                status={this.state.status}
                                onClick={() => this.handleMore()}/>
            </div>
        );
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
        console.log("this:",this);
        const self = this;
        if (!this.props.id) {
            this.context.router.push(`login/${"integral"}`);
        } else {
            document.title = "我的能量";
            this.setState({isRequest: true});
            DataStore.getIntegralOrder({pageIndex: 0, pageSize: 5}).then(function (responseObject) {
                self.setState({integrals: responseObject, isRequest: false});
                self.drawPie();
            },function(error){
                MessageBox.show(error.message)
                this.setState({isRequest: false});
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
        const logoImageUrl = !this.props.imageUrl ? require('logo') : this.props.imageUrl;
        return (
            <div className="m-i">
                <div className="m-i-h">
                    <div className="m-i-h-p-c">
                        <div className="m-i-h-p-c-value">
                            <div className="flag">喜悦能量</div>
                            <div className="value">{this.props.totalScore}</div>
                            { this.props.totalScore > 0 ? (<div className="indicator">查看详情</div>) : (<div></div>)}
                        </div>
                        <div className="m-i-h-p-c-arc" onClick={() => this.props.totalScore > 0 && this.handleDetail()}>
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
                        <img src={logoImageUrl}/>
                    </div>
                    <div className="m-i-banner-desc">
                        您当前排名第<span>{this.props.range}</span>名
                    </div>
                </div>
                <div className="m-i-section-header">能量排名</div>
                {
                    this.state.isRequest ? (<div className="m-i-loading"></div>) : (
                        <div className="m-i-order-container">
                            {
                                this.state.integrals.length > 0 ? this.state.integrals.map(function (integral, index) {
                                    return (<IntegralOrderCell model={integral} key={index}/>)
                                }) : (<div className="no-range">暂无排名信息</div>)
                            }
                        </div>)
                }
                {
                    this.state.integrals.length >= 5  && (
                        <div className="m-i-more-container">
                            <LoadingButton text="查看更多排名" loadingText="数据查询中..." status={0}
                                           onClick={() => this.handleMore()}/>
                        </div>
                    )
                }
            </div>
        );
    }
}

MyIntegralInner.contextTypes = {
    router: React.PropTypes.object
}

const MyIntegral = connect(mapStateToProps)(MyIntegralInner)

export {MoreIntegral, MyIntegral, IntegralDetail};