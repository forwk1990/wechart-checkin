import React from 'react';
import './activityCell.scss';
import {Modal} from 'antd-mobile'
import {WxManager} from 'Utils'

class ActivityCell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {visible: false}
    }

    handleNavigate() {
        const path = window.location.origin + window.location.pathname;
        console.log("activity:", this.props.activity);
        if (this.props.activity.isFull == 1) {
            this.setState({
                visible: true
            })
        } else {
            if (this.props.isMine) {

                window.location.href =  `${path}?id=${this.props.activity.id}#/ticket/${this.props.activity.code}/${this.props.activity.shortCode}/${this.props.activity.isComplete}`;
            } else {
                window.location.href = WxManager.authorizePage(`${path}?id=${this.props.activity.id}`);
            }
        }
    }

    onClose() {
        this.setState({
            visible: false
        });
    }

    render() {
        return (
            <div className="activity-cell">
                <div className="activity-cell-container" onClick={ () => this.handleNavigate()}>
                    <div className="activity-cell-container-title">{this.props.activity.title}</div>
                    <div className="activity-cell-container-image"
                         style={{background: `url(${this.props.activity.imageUrl}) center center / cover no-repeat`}}>
                    </div>
                    <div className="activity-cell-container-date">{this.props.activity.activeTime}</div>
                    <div className="activity-cell-container-address text-overflow">{this.props.activity.address}</div>
                    {
                        this.props.activity.isFull == 1 && (<div className="activity-cell-container-flag">人数已满</div>)
                    }
                    <Modal
                        title="温馨提示"
                        transparent
                        closable={false}
                        maskClosable={false}
                        visible={this.state.visible}
                        onClose={this.onClose}
                        footer={[{
                            text: '确定', onPress: () => {
                                console.log('ok');
                                this.onClose();
                            }
                        }]}>
                        很抱歉，由于活动太火爆，现人数已满<br />
                    </Modal>
                </div>
            </div>
        );
    }
}

export default ActivityCell;