import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import "./ConfirmWindow.scss"

import $ from 'jquery';


class ConfirmWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {visible: 1};
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    handleCloseClick() {
        this.setState({visible: 0});
        this._destory();
    }

    _destory(){
        var self = this;
        setTimeout(function(){
            self.props.closeCallback();
        },800);
    }


    handleSaveClick() {
        this.setState({visible: 0});
        this._destory();
    }

    componentDidMount() {

    }

    render() {
        const originalPrice = (this.props.originalPrice * 0.0001).toFixed(2);
        const price = (this.props.price * 0.0001).toFixed(2);
        const name = this.props.name;
        const title = "填写购买信息";
        let bgStyle = {display:this.state.visible ? "block" : "none"};
        return (
            <div className="confirm-modal" key="confirm-modal">
                <div className="confirm-modal-bg" style={bgStyle}></div>
                <ReactCSSTransitionGroup
                    transitionEnter={false}
                    transitionLeave={true} transitionLeaveTimeout={800}
                    transitionAppear={true} transitionAppearTimeout={1000}
                    transitionName={ {
                            leave: 'dialog-leave',
                            leaveActive: 'dialog-leave-active',
                            appear: 'dialog-appear',
                            appearActive: 'dialog-appear-active'
                      } } component="div">
                    {this.state.visible == 1 && (
                        <div className="confirm-modal-content">
                            <div className="row">
                                <div className="small-12 columns">
                                    <p className="confirm-title">{title}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-12 columns">
                                    <p className="confirm-product-name">商品：{name}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-12 columns">
                                    <p className="confirm-product-origin-price">原价：¥{originalPrice}万</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-12 columns">
                                    <p className="confirm-product-price">现价：¥{price}万</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-12 columns">
                                    <input className="confirm-input-name" placeholder="收件人姓名" type="text"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-12 columns">
                                    <input className="confirm-input-phone" placeholder="联系电话" type="text"/>
                                </div>
                            </div>
                            <div className="row confirm-action-group">
                                <div className="small-6 columns padding-normal">
                                    <span className="action-button gradient1" onClick={this.handleCloseClick}
                                          value="buy">取消</span>
                                </div>
                                <div className="small-6 columns padding-normal">
                                    <span className="action-button gradient2" onClick={this.handleSaveClick}>保存</span>
                                </div>
                            </div>
                        </div>)}
                </ReactCSSTransitionGroup>
            </div>
        );
    }

}

export default ConfirmWindow
