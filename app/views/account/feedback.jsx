import React from 'react';
import Contribute from 'contribute';

class Feedback extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.setTitle("我的反馈");
    }

    render(){
        return (
            <Contribute/>
        );
    }

}

export  default  Feedback;