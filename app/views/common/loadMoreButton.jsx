import React from 'react';
import './loadMoreButton.scss'


class LoadMoreButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {...props};
    }

    render() {
        const status = this.props.status;
        const text = this.props.text;
        const loadingText = this.props.loadingText;
        return (
            <div onClick={(event) => this.props.onClick(event)}>
            {
                !status ? (<div className="load-more-button">{text}</div>)
                    : (
                    <div className="load-more-button">
                        <div className="load-more-button-loading"></div>
                        <div className="load-more-button-text">{loadingText}</div>
                    </div>
                )
            }
        </div>);
    }
}

export default LoadMoreButton;