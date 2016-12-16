/**
 * Created by Itachi
 * on 2016-10-20.
 */

import React from 'react';
import './assets/stylesheets/app.scss';
import {connect} from 'react-redux';
import {MessageBox, Validator} from 'Utils';
import DataStore from 'DataStore';
import ActionTypes from 'constants/ActionTypes';

class App extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     isAutoLoginComplete: false
        // };
    }

    componentDidMount() {
        // if (this.props.id) {
        //     const self = this;
        //     this.setState({isAutoLoginComplete: true});
        //     DataStore.login({phone:this.props.phone,password:this.props.password}).then(function (responseObject) {
        //         self.setState({isAutoLoginComplete: false});
        //         self.props.dispatch({type: ActionTypes.login, responseObject});
        //     }, function (error) {
        //         self.setState({isAutoLoginComplete: false});
        //         /*登陆失败后，干掉本地用户信息*/
        //         self.props.dispatch({type: ActionTypes.clearUser});
        //     });
        // }
    }

    render() {
        // return this.state.isAutoLoginComplete ? ((<div className="loading"></div>)) : (
        //     <div className="app">
        //         {this.props.children}
        //     </div>
        // );
        return  (
            <div className="app">
                {this.props.children}
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         id: state.userInfoReducer.id,
//         phone: state.userInfoReducer.phone,
//         password: state.userInfoReducer.password /*md5格式,做自动登陆*/
//     }
// }

// export default connect(mapStateToProps)(App);
export default App;
