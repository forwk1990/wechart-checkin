import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import './LoadingBar.scss'


class LoadingBar extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.info("component ");


        console.info("component ");
        console.info("component ");

        console.info("component ");

        const {dispatch} = this.props;

        setTimeout(function(){
            dispatch({type:'xxx'});
        },10000);
    }

    render(){
        let price = (this.props.price * 0.0001).toFixed(2);
        let originalPrice = (this.props.originalPrice * 0.0001).toFixed(2);
        const percent = parseInt(((originalPrice-price) * 100) / originalPrice);
        const progressStyle = {width:percent + "%"};
        var triangleStyle = {};
        var tipStyle = {marginLeft: percent + "%"};
        if(percent >= 0 && percent <= 33){
            triangleStyle = {left:"4px"};
            tipStyle = {marginLeft: "calc(" +percent + "% - 8px)"};
        }else if(percent >= 36 && percent <= 66){
            triangleStyle = {left:"28px"};
            tipStyle = {marginLeft: "calc(" +percent + "% - 35px)"};
        }else{
            triangleStyle = {left:"56px"};
            tipStyle = {marginLeft: "calc("+percent+"% - 62px)"};
        }

        let name = this.props.name;
        let isProgress = this.props.isProgress;
        return (
            <div className="row">
                <div className="small-12 columns padding-normal">
                    <div className="row tip" style={tipStyle}>
                        <div className="small-12 columns padding-clear">
                            <span className="tip-content">¥{price}万</span>
                        </div>
                        <div className="small-12 columns padding-clear">
                            <span className="tip-flag">现价</span>
                        </div>
                        <span className="tip-triangle" style={triangleStyle}></span>
                    </div>
                </div>
                <div className="small-12 columns padding-normal loading-bar-border">
                    <div className="loading-bar-background"></div>
                    <div className="loading-bar-progress" style={progressStyle}></div>
                </div>
                <div className="small-6 columns padding-normal">
                    <span className="price">原价¥{originalPrice}万</span>
                </div>
                <div className="small-6 columns padding-normal">
                    <span className="product">{name}</span>
                </div>
                {isProgress && <span>中华人民共和国万岁</span>}
            </div>
        );
    }

}

function appState(state){
    return {
        isProgress:state.isProgress
    };
}


export default connect(appState)(LoadingBar);
