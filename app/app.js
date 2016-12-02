/**
 * Created by Itachi
 * on 2016-10-20.
 */

import React from 'react';
import './assets/stylesheets/app.scss'

class App extends React.Component {

    constructor(props) {
        super(props);
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
