import React from 'react';
import DataStore from 'DataStore';
import './myIntegral.scss';
import LoadingButton from 'loadingButton';


const IntegralOrderCell  = (props) => {
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

class MyIntegral extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            integrals:[]
        };
    }

    componentDidMount(){
        const self = this;
        DataStore.getIntegralOrder({pageIndex:0,pageSize:5}).then(function(responseObject){
            console.info(responseObject);
            self.setState({integrals:responseObject});
        });
    }

    handleMore(){

    }

    render(){
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
                        this.state.integrals.map(function(integral,index){
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

export default MyIntegral;