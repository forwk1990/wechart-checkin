import React from 'react';
import DataStore from 'DataStore';
import {connect} from 'react-redux';
import './activity.scss';
import ActivityCell from 'activityCell'
import {WxManager} from 'Utils'

const NoActivityList = () => {
    return (
        (
            <div className="no-activity">
                <div className="no-activity-content">
                    <div className="no-activity-content-background-list"></div>
                    <div className="no-activity-content-big-message">目前没有新活动哦</div>
                    <div className="no-activity-content-small-message">感谢您对我们的信任与支持</div>
                </div>
            </div>
        )
    )
}

class Activity extends React.Component {

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
        document.setTitle("线下活动");
        DataStore.getAllActivity({}).then(function (responseObject) {
            self.setState({activities: responseObject,isRequest: false});
            WxManager.shareAllWithOption(WxManager.offlineShareOptions())
        },function () {
            self.setState({isRequest: false});
        });
    }

    render() {
        return this.state.isRequest ? (<div className="loading"></div>) : (
            <div className="my-activity">
                {
                    this.state.activities.length > 0 ? this.state.activities.map(function (activity, index) {
                        return (<ActivityCell activity={activity} key={index} isMine={false}/>)
                    }) : (
                        <NoActivityList/>
                    )
                }
            </div>
        );
    }
}

Activity.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        id:state.userInfoReducer.id
    }
}


export default connect(mapStateToProps)(Activity);