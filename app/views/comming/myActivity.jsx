import React from 'react';
import DataStore from 'DataStore';
import {connect} from 'react-redux';
import './myActivity.scss';


class ActivityCell extends React.Component {

    constructor(props) {
        super(props);
    }

    handleNavigate() {
        const path = window.location.origin + window.location.pathname;
        window.location.href = `${path}?id=${this.props.activity.id}`;
    }

    render() {
        return (
            <div className="activity-cell">
                <div className="activity-cell-container" onClick={ () => this.handleNavigate()}>
                    <div className="activity-cell-container-title">{this.props.activity.title}</div>
                    <div className="activity-cell-container-image">
                        <img src={this.props.activity.imageUrl}/>
                    </div>
                    <div className="activity-cell-container-date">{this.props.activity.date}</div>
                    <div className="activity-cell-container-address">{this.props.activity.address}</div>
                </div>
            </div>
        );
    }

}


class MyActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            isRequest: false
        };
    }

    componentDidMount() {
        const self = this;
        self.setState({isRequest: true});
        DataStore.getMyActivity({userId: this.props.id}).then(function (responseObject) {
            self.setState({activities: responseObject,isRequest: false});
        });
    }

    render() {
        return this.state.isRequest ? (<div className="loading"></div>) : (
            <div className="my-activity">
                {
                    this.state.activities.map(function (activity, index) {
                        return (<ActivityCell activity={activity} key={index}/>)
                    })
                }
            </div>
        );
    }
}

ActivityCell.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        id:state.userInfoReducer.id
    }
}


export default connect(mapStateToProps)(MyActivity);