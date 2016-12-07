import React, {Component} from 'react';
import {Link} from 'react-router';
import './lifeCalculator.scss';

class LifeCalculator extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="life-calculator">
                <div className="life-calculator-background">
                    <div className="lifeNumberImage"></div>
                    <div className="fateNumberImage"></div>
                </div>

            </div>
        );
    }
}

export default LifeCalculator;