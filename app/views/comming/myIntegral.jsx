import React from 'react';
import DataStore from 'DataStore';
import './myIntegral.scss';
import LoadingButton from 'loadingButton';
import LoadMoreButton from 'common/loadMoreButton';

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

class MyIntegral extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            integrals: []
        };
    }

    componentDidMount() {
        const self = this;
        DataStore.getIntegralOrder({pageIndex: 0, pageSize: 5}).then(function (responseObject) {
            console.info(responseObject);
            self.setState({integrals: responseObject});
        });
    }

    handleMore() {
        this.context.router.push("mine/moreIntegral");
    }

    render() {
        return (
            <div className="m-i">
                <div className="m-i-h">
                    <div className="m-i-h-p-c">
                        <div className="m-i-h-p-c-activity"></div>
                        <div className="m-i-h-p-c-number"></div>
                        <div className="m-i-h-p-c-life"></div>
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
                    <div className="m-i-banner-logo"></div>
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

MyIntegral.contextTypes = {
    router: React.PropTypes.object
}

export {MoreIntegral, MyIntegral, IntegralDetail};