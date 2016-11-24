import React from 'react';
import 'loadingButton.scss';


class LoadingButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {...props};
    }

    handleClick(event){
        this.state.onClick(event);
    }

    render() {
        const status = this.props.status;
        const text = this.props.text;
        const loadingText = this.props.loadingText;
        return status != 1 ? (<div className="loading-button" onClick={(event) => this.handleClick(event)}>{text}</div>)
            : (
            <div className="loading-button">
                <div className="loading-button-loading"></div>
                <div className="loading-button-text">{loadingText}</div>
            </div>
        );
    }

}

export default LoadingButton;