import React from 'react';
import DataStore from 'DataStore';
import './activityGroup.scss';

class ActivityGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRequest: false,
            name: '',
            url: '',
            isExist: true
        };
    }

    componentDidMount() {
        const self = this;
        self.setState({isRequest: true});
        DataStore.getActivityGroup({id: self.props.params.activityId}).then(function (responseObject) {
            self.setState({isRequest: false});
            self.setState({name: responseObject.name, url: responseObject.url});
        }, function () {
            self.setState({isRequest: false,isExist: false});
        });
    }

    render() {
        return this.state.isRequest ? (<div className="loading"></div>) : this.state.isExist ? (
            <div className="activity-group">
                <div className="activity-group-content">
                    <div className="activity-group-content-header">
                        <div className="activity-group-content-header-image">
                            <img src={require('喜宝100')}/>
                        </div>
                        <div className="activity-group-content-header-title">{this.state.name}</div>
                    </div>
                    <div className="activity-group-content-qrcode">
                        <img src={this.state.url}/>
                    </div>
                    <div className="activity-group-content-desc">
                        扫一扫或者长按二维码进入微信群获取更多资讯
                    </div>
                </div>
            </div>
        ) : (<div className="activity-group-nothing">暂无活动群信息</div>);
    }
}

export default ActivityGroup;