import React from 'react';
import DataStore from 'DataStore';
import {connect} from 'react-redux';
import LoadingButton from 'loadingButton';
import './myActivity.scss';
import ActivityCell from 'activityCell';
import {WxManager} from 'Utils'

class NoActivity extends React.Component{

    constructor(props){
        super(props);
    }

    handleClick(){
        this.context.router.push(`activity`);
    }

    render(){
        return (
            <div className="no-activity">
                <div className="no-activity-content">
                    <div className="no-activity-content-background"></div>
                    <div className="no-activity-content-big-message">您还未参加任何活动哦</div>
                    <div className="no-activity-content-small-message">您可在 喜悦互动 喜悦活动 参加活动</div>
                </div>
                <LoadingButton text="点此参与活动" status={0} onClick={() => this.handleClick()}/>
            </div>
        );
    }
}

NoActivity.contextTypes = {
    router: React.PropTypes.object
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
        document.setTitle("我的活动");
        if (!this.props.id) {
            this.context.router.push(`login/${"activity"}`);
        }else{
            DataStore.getMyActivity({id: this.props.id}).then(function (responseObject) {
                self.setState({activities: responseObject,isRequest: false});
                WxManager.shareAllWithOption({title: "活动列表", desc: `喜悦活动列表`,link:`${window.location.origin}/wx/index.jsp#/activity`})
            },function(){
                self.setState({isRequest: false});
            });
        }
    }

    render() {
        return this.state.isRequest ? (<div className="loading"></div>) : (
            <div className="my-activity">
                {
                    this.state.activities.length > 0 ? this.state.activities.map(function (activity, index) {
                        return (<ActivityCell activity={activity} key={index} isMine={true}/>)
                    }) : (
                        <NoActivity/>
                    )
                }
            </div>
        );
    }
}

MyActivity.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        id:state.userInfoReducer.id
    }
}


export default connect(mapStateToProps)(MyActivity);