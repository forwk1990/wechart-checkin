import './countDown.scss'

import React from 'react'

class CountDown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {...props, isActive: false};
    }

    handleClick() {
        const self = this;
        if (self.state.isActive)return;
        if (self.props.onClick && self.props.onClick() === false) return;
        self.setState({isActive: true});
        let seconds = 60;
        self.setState({text: `${seconds}s`});
        const interval = setInterval(function () {
            if (self.props.stop) {
                clearInterval(interval);
            } else {
                seconds--;
                if (seconds < 0) {
                    clearInterval(interval);
                    self.setState({isActive: false});
                    self.setState({text: self.props.text});
                } else {
                    self.setState({text: `${seconds}s`});
                }
            }
        }, 1000);
    }

    render() {
        const {text} = this.state;
        let style = this.state.isActive ? {color: "#999999"} : {};
        return (
            <div className="count-down" onClick={() => this.handleClick()} style={style}>
                {text}
            </div>
        );
    }

}

export default CountDown;