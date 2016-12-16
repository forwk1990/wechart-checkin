import React from 'react';
import Contribute from 'contribute';

class Donate extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = "我的捐赠";
    }

    render() {
        return (
            <Contribute/>
        );
    }

}

export  default  Donate;