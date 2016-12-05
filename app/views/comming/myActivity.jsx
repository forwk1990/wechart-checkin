

import React from 'react';
import DataStore from 'DataStore';
import './myActivity.scss';


const ActivityCell = (props) => {
    return (
        <div className="activity-cell">
            <div className="activity-cell-container">
                <div className="activity-cell-container-title">{props.activity.title}</div>
                <div className="activity-cell-container-image">
                    <img src={props.activity.imageUrl}/>
                </div>
                <div className="activity-cell-container-date">{props.activity.date}</div>
                <div className="activity-cell-container-address">{props.activity.address}</div>
            </div>
        </div>
    );
}


class MyActivity extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            activitys:[]
        };
    }

    componentDidMount(){
        const self = this;
        DataStore.getMyActivity({userId:''}).then(function(responseObject){
            self.setState({activitys:responseObject});
        });
    }

    render(){
        return (
            <div className="my-activity">
                {
                    this.state.activitys.map(function(activity){
                        return (<ActivityCell activity={activity}/>)
                    })
                }
            </div>
        );
    }
}

export default MyActivity;