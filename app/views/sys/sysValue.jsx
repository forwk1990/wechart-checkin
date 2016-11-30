import React from 'react';
import {Carousel, Popup} from 'antd-mobile';
import './sysValue.scss';
import {connect} from 'react-redux';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    // Note: the popup content will not scroll.
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

class SysCarouselItem extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const width = $(document).width();
        const height = $(document).height();
        const rate = 928 / 560;
        const padding = 40 * width / 320;
        const backgroundSizeWidth = width - padding;
        const backgroundSizeHeight = backgroundSizeWidth * rate;
        $(".sys-carousel-container").height(`${0.01 * (height - 80)}rem`);

        $(".sys-carousel-container").each(function () {
            this.style.backgroundSize = `${backgroundSizeWidth * 0.01}rem ${backgroundSizeHeight * 0.01}rem`;
        });
        console.info(width, height, padding);
        const bottom = (178 * backgroundSizeHeight / 928) + height - backgroundSizeHeight - 80;
        $(".sys-carousel-container-event-proxy").each(function () {
            this.style.bottom = `${0.01 * bottom}rem`;
        });
    }

    handleClick() {
        const dataSource = this.props.dataSource;
        console.info(dataSource);
        Popup.show(
            <div className="tf-epl">
                <div className="tf-epl-header">
                    <span>{dataSource.title}</span>
                    <span>释义</span>
                </div>
                <div className="tf-epl-line"></div>
                <div className="tf-epl-value">{dataSource.value}</div>
                {
                    dataSource.keyValues.map(function (keyValue,index) {
                        return (
                            <div key={`key-value-${index}`} className="tf-epl-key-value">
                                <span>{keyValue.key}</span>
                                <span>:</span>
                                <span>{keyValue.value}</span>
                            </div>
                        );
                    })
                }

            </div>
            , {animationType: 'slide-up', wrapProps, maskClosable: false});
        $(".am-popup-mask").click(function () {
            Popup.hide();
        });
    }

    render() {
        const {dataSource} = this.props;
        return (
            <div className="sys-carousel-container">
                <span>{dataSource.value}</span>
                <div className="sys-carousel-container-event-proxy" onClick={ () => this.handleClick()}></div>
            </div>
        );
    }
}

class SysValue extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log("xxx",this.props.data);
        const cardArray = this.props.data;
        return (
            <div className="sys-value">
                <Carousel>
                    {
                        cardArray.map(function (card,index) {
                            return (<SysCarouselItem key={`sys-item-${index}`} dataSource={card}/>)
                        })
                    }
                </Carousel>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.explainReducer.data
    }
}

export default connect(mapStateToProps)(SysValue);