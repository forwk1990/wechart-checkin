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
            <div onClick={(event) => status !== -1 && this.props.onClick(event)}>
                {
                    status == 0 && (<div className="load-more-button">{text}</div>)
                }
                {
                    status == 1 && (
                        <div className="load-more-button">
                            <div className="load-more-button-loading"></div>
                            <div className="load-more-button-text">{loadingText}</div>
                        </div>
                    )
                }
                {
                    status == -1 && (<div className="load-more-button">没有更多了</div>)
                }
            </div>);
    }
}

export default LoadMoreButton;