
import React from 'react';
import './loadMoreButton.scss'


class LoadMoreButton extends React.Component{

    constructor(props){
        super(props);
        this.state = {...props};
    }

    render(){
        const status = this.props.status;
        const text = this.props.text;
        const loadingText = this.props.loadingText;
        return !status ? (<div className="load-more-button" onClick={(event) => this.handleClick(event)}>{text}</div>)
            : (
            <div className="load-more-button">
                <div className="load-more-button-loading"></div>
                <div className="load-more-button-text">{loadingText}</div>
            </div>
        );
    }
}

export default LoadMoreButton;