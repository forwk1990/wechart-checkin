/**
 * Created by itachi on 16/11/10.
 */

import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Link,IndexLink,browserHistory } from 'react-router'

export class About extends React.Component{
    render() {
        return <h3>About</h3>
    }
}

export class Inbox extends React.Component{

    render() {
        return (
            <div>
                <h2>Inbox</h2>
                <ul>
                    <li><Link to="/inbox/reactjs/react-router">React Router</Link></li>
                    <li><Link to="/inbox/facebook/react">React</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

export class Message extends React.Component{

    handleClick(event){
        event.preventDefault()
        const userName = "facebook"
        const repo = "react"
        const path = `/inbox/${userName}/${repo}`
        console.log(path);
        browserHistory.push(path)
        //this.context.router.goBack()
    }

    render() {
        return <h3>Message
            <span onClick={this.handleClick.bind(this)}>Click Back</span>
            {this.props.params.repoName}</h3>
    }
}

export class App extends React.Component{

    constructor(props){
        super(props);
    }



    onClickAboutUs(event) {
        event.preventDefault();
        this.context.transitionRouter.show({
            pathname: '/inbox',
            state: {
                showTransition: {
                    transitionName: 'show-from-top',
                    transitionEnterTimeout: 500,
                    transitionLeaveTimeout: 300,
                },
                dismissTransition: {
                    transitionName: 'dismiss-from-top',
                    transitionEnterTimeout: 500,
                    transitionLeaveTimeout: 300,
                },
            },
        });
    }

    render() {
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><IndexLink to="/" activeStyle={{ color: 'red' }}>Back</IndexLink></li>
                    <li><Link to="/about">About</Link></li>
                    <li><a href="/inbox" onClick={this.onClickAboutUs}>Inbox</a></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

App.contextTypes = {
    transitionRouter: React.PropTypes.object
}

