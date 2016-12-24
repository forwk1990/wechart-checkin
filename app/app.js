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

import Reactotron, { trackGlobalErrors } from 'reactotron-react-js'
import { reactotronRedux } from 'reactotron-redux'
Reactotron.configure({ name: 'React Native Demo' }).use(trackGlobalErrors()).connect()

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAutoLoginComplete: false
        };
    }

    /*
    * 组件挂载完毕后，启用自动登陆。
    * 清除User的时机应在子组件挂载前，确保子组件逻辑无侵入。
    * */
    componentDidMount() {
        if (this.props.id) {
            const self = this;
            self.setState({isAutoLoginComplete: true});
            if(self.props.token){
                DataStore.autoLogin({id:self.props.id,token:self.props.token}).then(function (responseObject) {
                    self.props.dispatch({type: ActionTypes.login, responseObject});
                    self.setState({isAutoLoginComplete: false});
                }, function () {
                    self.props.dispatch({type: ActionTypes.clearUser});
                    self.setState({isAutoLoginComplete: false});
                });
            }else{
                self.props.dispatch({type: ActionTypes.clearUser});
                self.setState({isAutoLoginComplete: false});
            }
        }
    }

    render() {
        return this.state.isAutoLoginComplete ? ((<div className="loading"></div>)) : (
            <div className="app">
                {this.props.children}
            </div>
        );
        // return  (
        //     <div className="app">
        //         {this.props.children}
        //     </div>
        // );
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.userInfoReducer.id,
        token: state.userInfoReducer.token
    }
}

export default connect(mapStateToProps)(App);
// export default App;
