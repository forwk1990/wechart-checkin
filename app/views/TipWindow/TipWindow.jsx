import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import "./TipWindow.scss"

import $ from 'jquery';



class TipWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: 1,
            originalPrice: 0,
            price: 0,
            money: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({visible: 0});
    }

    componentDidMount() {

    }

    componentWillUnmount(){
        console.info("component will unmout");
    }

    componentWillLeave(callback) {
        console.info("componentWillLeave() will call ");
    }

    componentDidLeave() {
        console.info("componentDidLeave()");
    }

    render() {
        const title = this.props.isMine == true ? "为自己砍了" : "你帮TA砍了";
        const originalPrice = (this.props.originalPrice * 0.0001).toFixed(2);
        const price = (this.props.price * 0.0001).toFixed(2);
        const money = (this.props.money).toFixed(0);
        const name = this.props.name;
        let bgStyle = {display:this.state.visible ? "block" : "none"};
        return (
            <div className="tip-modal" key="tip-modal">
                <div className="tip-modal-bg" style={bgStyle}></div>
                <ReactCSSTransitionGroup transitionEnter={false}
                                         transitionLeave={true} transitionLeaveTimeout={800}
                                         transitionAppear={true} transitionAppearTimeout={1000}
                                         transitionName={{ 
                                         leave: 'dialog-leave', 
                                         leaveActive: 'dialog-leave-active', 
                                         appear: 'dialog-appear', 
                                         appearActive: 'dialog-appear-active'}}
                                         component="div">
                    {this.state.visible == 1 && (
                    <div className="tip-modal-content open"><p className="title">{title}</p>

                        <p className="cut-price">¥{money}</p>

                        <p className="product-name">{name}</p>

                        <p className="product-origin-price">原价¥{originalPrice}万</p>

                        <p className="product-price">现价¥{price}万</p>

                        <div className="row know">
                            <div className="small-12 columns padding-normal">
                                <span className="action-button gradient1" onClick={this.handleClick}>我知道了</span>
                            </div>
                        </div>
                    </div>)}
                </ReactCSSTransitionGroup>
            </div>
        );
        //return (
        //    <ReactCSSTransitionGroup
        //        transitionEnter={false}
        //        transitionAppear={false}
        //        transitionLeave={false}
        //        transitionLeaveTimeout={2000}
        //        transitionName={ {
        //                    leave: 'tip-modal-leave',
        //                    leaveActive: 'tip-modal-leave-active'
        //              } } component="div">
        //        {this.state.visible == 1 && (
        //            <div className="tip-modal" key="tip-modal">
        //                <div className="tip-modal-bg"></div>
        //                <ReactCSSTransitionGroup
        //                    transitionEnter={false}
        //                    transitionLeave={true}
        //                    transitionLeaveTimeout={1000}
        //                    transitionAppear={true}
        //                    transitionAppearTimeout={1000}
        //                    transitionName={ {
        //                    appear: 'tip-content-appear',
        //                    appearActive: 'tip-content-appear-active'
        //              } } component="div">
        //                    <div className="tip-modal-content open">
        //                        <p className="title">{title}</p>
        //
        //                        <p className="cut-price">¥{money}</p>
        //
        //                        <p className="product-name">{name}</p>
        //
        //                        <p className="product-origin-price">原价¥{originalPrice}万</p>
        //
        //                        <p className="product-price">现价¥{price}万</p>
        //
        //                        <div className="row know">
        //                            <div className="small-12 columns padding-normal">
        //                                    <span className="action-button gradient1"
        //                                          onClick={this.handleClick}>我知道了</span>
        //                            </div>
        //                        </div>
        //                    </div>
        //                </ReactCSSTransitionGroup>
        //            </div>
        //        )}
        //    </ReactCSSTransitionGroup>
        //);
    }
}

TipWindow.proptypes = {
    price: React.PropTypes.number.isRequired,
    originalPrice: React.PropTypes.number.isRequired,
    money: React.PropTypes.number.isRequired,
    isMine: React.PropTypes.bool.isRequired
}

export default TipWindow
