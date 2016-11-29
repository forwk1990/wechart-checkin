import React from 'react';
import {Carousel} from 'antd-mobile';
import './sysValue.scss';


class SysCarouselItem extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        const {value} = this.props;
        return (
            <div className="sys-value-container-inner">
                <div className="sys-value-container-inner-top">

                </div>
                <div className="sys-value-container-inner-middle">
                    {value}
                </div>
                <div className="sys-value-container-inner-bottom">

                </div>
            </div>
        );
    }
}

class SysValue extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
        <div className="sys-value">
            <div className="sys-value-container">
                <div className="sys-value-container-corner-top-left"></div>
                <div className="sys-value-container-corner-bottom-left"></div>
                <div className="sys-value-container-corner-top-right"></div>
                <div className="sys-value-container-corner-bottom-right"></div>
                <Carousel>
                    <SysCarouselItem value={1}/>
                    <SysCarouselItem value={2}/>
                </Carousel>
            </div>
        </div>
        );
    }
}

export default SysValue;