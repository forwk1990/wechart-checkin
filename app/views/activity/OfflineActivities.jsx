import React from 'react'
import DataStore from 'DataStore'
import NothingPage from 'NothingPage'
import './OfflineActivities.scss'


const OfflineActivityCell = (props) => {
    return (
        <div className="offline-activity-cell" onClick={() => props.onClick()}>
            <div className="offline-activity-cell-image" style={{background: `url(${props.activity.imageUrl}) center center / cover no-repeat`}}></div>
            <div className="offline-activity-cell-title">{props.activity.title}</div>
            <div className="offline-activity-cell-date">{props.activity.activeTime}</div>
            <div className="offline-activity-cell-address text-overflow">{props.activity.address}</div>
        </div>
    )
}

class OfflineActivities extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isRequest: false,
            activities: []
        }
    }

    componentDidMount() {
        document.setTitle("线下活动");
        const self = this;
        self.setState({isRequest: true});
        DataStore.getAllActivity({}).then(function (responseObject) {
            self.setState({isRequest: false, activities: responseObject});
        },function () {
            self.setState({isRequest: false});
        })
    }

    handleClick(activityId){
        const path = window.location.origin + window.location.pathname;
        window.location.href = `${path}?id=${activityId}`;
    }

    render() {
        const self = this;
        return this.state.isRequest ? (<div className="loading"></div>) : (
            <div className="offline-activity-list">
                {
                    this.state.activities.length > 0 ? this.state.activities.map(function (activity,i) {
                        return (<OfflineActivityCell key={i} activity={activity} onClick={() => self.handleClick(activity.id)}/>)
                    }) : (
                        <NothingPage model={{imageUrl:require('activityBackgroundList'),bigMessage:"目前没有新活动哦",smallMessage:"感谢您对我们的信任与支持"}}/>
                    )
                }
            </div>
        )
    }
}

export default OfflineActivities