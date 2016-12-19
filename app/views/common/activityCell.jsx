import React from 'react';
import './activityCell.scss';

class ActivityCell extends React.Component {

    constructor(props) {
        super(props);
    }

    handleNavigate() {
        const path = window.location.origin + window.location.pathname;
        console.log("activity:", this.props.activity);
        if (this.props.isMine) {
            window.location.href = `${path}?id=${this.props.activity.id}#/ticket/${this.props.activity.code}/${this.props.activity.shortCode}/${this.props.activity.isComplete}`;
        } else {
            window.location.href = `${path}?id=${this.props.activity.id}`;
        }
    }

    render() {
        return (
            <div className="activity-cell">
                <div className="activity-cell-container" onClick={ () => this.handleNavigate()}>
                    <div className="activity-cell-container-title">{this.props.activity.title}</div>
                    <div className="activity-cell-container-image"
                         style={{background: `url(${this.props.activity.imageUrl}) center center no-repeat`,backgroundSize:"100% 100%"}}>
                    </div>
                    <div className="activity-cell-container-date">{this.props.activity.activeTime}</div>
                    <div className="activity-cell-container-address text-overflow">{this.props.activity.address}</div>
                </div>
            </div>
        );
    }
}

export default ActivityCell;