import React from 'react'
import {Tabs} from 'antd-mobile'
import DataStore from 'DataStore'
import './MineActivities.scss'


const MineActivityCell = (props) => {
    return (
        <div className="mine-activity-cell">
            <div className="mine-activity-cell-top"></div>
            <div className="mine-activity-cell-title">{props.model.title}</div>
            <div className="mine-activity-cell-date">{props.model.activeTime}</div>
            <div className="mine-activity-cell-address">{props.model.address}</div>
            <div className="mine-activities-cell-indicator"></div>
            <div className="mine-activity-cell-bottom"></div>
        </div>
    )
}

class MineActivities extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isRequest: false,
            activities: []
        }
    }

    componentDidMount() {
        document.setTitle("我的活动");
        const self = this;
        self.setState({isRequest: true})
        DataStore.getMyActivity({id: '', type: 0}).then(function (responseObject) {
            self.setState({isRequest: false, activities: responseObject})
        }, function () {
            self.setState({isRequest: false})
        })
    }

    render() {
        return this.state.isRequest ? (<div className="loading"></div>) :(
            <div className="mine-activities">
                {
                    this.state.activities.map(function (activity) {
                        return (<MineActivityCell model={activity}/>)
                    })
                }
            </div>
        )
    }
}

export default MineActivities