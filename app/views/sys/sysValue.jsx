import React from 'react';
import {Carousel, Popup} from 'antd-mobile';
import './sysValue.scss';
import {connect} from 'react-redux';

class SysCarouselItem extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const width = $(document).width() * 2 / window.devicePixelRatio;
        const height = $(document).height() * 2 / window.devicePixelRatio;
        const rate = 928 / 560;
        const padding = 40 * width / 320;
        let backgroundSizeWidth = width - padding;
        let backgroundSizeHeight = backgroundSizeWidth * rate;
        console.info(`width : ${width},backgroundSizeHeight : ${backgroundSizeHeight} - height: ${height}`);
        if (backgroundSizeHeight > height) {
            backgroundSizeHeight = height - 40 * height / 540;
            backgroundSizeWidth = height / rate;
        }
        console.info(`backgroundSizeWidth : ${backgroundSizeWidth} - backgroundSizeHeight : ${backgroundSizeHeight}`);
        const marginTop = 0.5 * (height - backgroundSizeHeight) * 0.01;
        $(".sys-carousel-container").each(function () {
            this.style.width = `${backgroundSizeWidth * 0.01}rem`;
            this.style.height = `${backgroundSizeHeight * 0.01}rem`;
            this.style.marginTop = `${marginTop}rem`;
        });
        const bottom = (178 * backgroundSizeHeight / 928) + marginTop;
        $(".sys-carousel-container-event-proxy").each(function () {
            this.style.bottom = `${0.01 * bottom}rem`;
        });
    }

    componentWillUnmount() {
        $(".am-popup-mask").parent().parent().remove();
    }

    handleClick() {
        const dataSource = this.props.dataSource;
        Popup.show(
            <div className="tf-epl-dialog">
                <div className="tf-epl-dialog-cover" onClick={() => Popup.hide()}></div>
                <div className="tf-epl">
                    <div className="tf-epl-header">
                        <span>{dataSource.title}</span>
                        <span>释义</span>
                    </div>
                    <div className="tf-epl-line"></div>
                    <div className="tf-epl-value">{dataSource.value}</div>
                    {
                        dataSource.keyValues.map(function (keyValue, index) {
                            return (
                                <div key={`key-value-${index}`} className="tf-epl-key-value">
                                    <span className="key">{keyValue.key}</span>
                                    <span>:</span>
                                    <span>{keyValue.value}</span>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            , {animationType: 'slide-up'});
    }

    render() {
        const {dataSource, imageUrl, isOk} = this.props;
        return (
            <div className="sys-carousel-container" style={{backgroundImage: `url(${imageUrl})`}}>
                {
                    !isOk ? (<span>{dataSource.value}</span>)
                        : (
                        <span>{dataSource.value}<br/>
                            <span>卓越数</span>
                        </span>)
                }
                <div className="sys-carousel-container-event-proxy" onClick={ () => this.handleClick()}></div>
            </div>
        );
    }
}

class SysValue extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.data) {
            this.context.router.push('sys');
        }
    }

    render() {
        const cardArray = this.props.data || [];
        return (
            <div className="sys-value">
                <Carousel>
                    {
                        cardArray.map(function (card, index) {
                            var isOk = false;
                            const imageUrl = index == 0 ? require("../../assets/images/mysk.png")
                                : require("../../assets/images/tfsk.png");
                            if(cardArray.length == 2 && index == 1){
                                isOk = true;
                            }
                            return (<SysCarouselItem key={`sys-item-${index}`} dataSource={card} imageUrl={imageUrl} isOk={isOk}/>)
                        })
                    }
                </Carousel>
            </div>
        );
    }
}

SysValue.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        data: state.explainReducer.data
    }
}

export default connect(mapStateToProps)(SysValue);