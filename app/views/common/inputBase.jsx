

import React from 'react';
import './inputBase.scss'


class InputBase extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="input-base">
                <div className="label"></div>
                <input type="text" />
            </div>
        );
    }

}