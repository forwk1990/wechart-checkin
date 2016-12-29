import React from 'react'
import {Tabs} from 'antd-mobile'
import DataStore from 'DataStore'
import {ColorManager} from 'Utils'
import './MineActivities.scss'


const ActivityStatus = {
    expired: -1,
    underway: 1,
    complete: 2
}

const MineActivityCell = (props) => {
    const seasonInfo = ColorManager.currentSeasonInfo(props.model.activeTime)
    const backgroundColor = props.mode == 1 ? seasonInfo.color : "#fff"
    const fontColor = props.mode == 1 ? "#fff" : "#999"
    var backgroundImageUrl = ''
    switch (props.model.status) {
        case ActivityStatus.expired: {
            backgroundImageUrl = require('已过期')
            break;
        }
        case ActivityStatus.underway: {
            backgroundImageUrl = seasonInfo.imageUrl
            break;
        }
        case ActivityStatus.complete: {
            backgroundImageUrl = require('已完成')
            break;
        }
        default:
            break;
    }
    return (
        <div className="mine-activity-cell" style={{backgroundColor: backgroundColor, color: fontColor}} onClick={() => props.handleNavigate()}>
            <div className="mine-activity-cell-top"></div>
            <div className="mine-activity-cell-title">{props.model.title}</div>
            <div className="mine-activity-cell-date">{props.model.activeTime}</div>
            <div className="mine-activity-cell-address">{props.model.address}</div>
            <div className="mine-activity-cell-indicator"></div>
            <div className="mine-activity-cell-flag" style={{backgroundImage: `url(${backgroundImageUrl})`}}></div>
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
        DataStore.getMyActivity({id: '', type: self.props.mode}).then(function (responseObject) {
            self.setState({isRequest: false, activities: responseObject})
        }, function () {
            self.setState({isRequest: false})
        })
    }

    handleNavigate(activity){
        const path = window.location.origin + window.location.pathname;
        window.location.href = `${path}?id=${activity.id}#/ticket/${activity.code}/${activity.shortCode}/${activity.isComplete}`;
    }

    render() {
        const self = this;
        return this.state.isRequest ? (<div className="loading-message">正在为您加载数据...</div>) : (
            <div className="mine-activities">
                {
                    this.state.activities.map(function (activity, i) {
                        return (<MineActivityCell handleNavigate={() => self.handleNavigate(activity)} type={1} key={i} model={activity} mode={self.props.mode}/>)
                    })
                }
            </div>
        )
    }
}

class MineActivitiesTabPages extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="mine-activities-tab-pages">
                <Tabs defaultActiveKey="1" swipeable={false}>
                    <Tabs.TabPane tab="参与中" key="1">
                        <MineActivities mode={1}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="历史活动" key="2">
                        <MineActivities mode={-1}/>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }

}

export default MineActivitiesTabPages