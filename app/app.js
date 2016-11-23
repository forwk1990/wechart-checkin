/**
 * Created by Itachi
 * on 2016-10-20.
 */

import React from 'react';
import FastClick from 'fastclick';

import './assets/stylesheets/app.scss'

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    // 组件加载到DOM中之后调用
    componentDidMount() {
        FastClick.attach(document.body);
    }

    render() {
        return (
            <div className="app">
                {this.props.children}
            </div>
        );
    }

}

export default App;
