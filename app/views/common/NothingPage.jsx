import React from 'react'
import 'NothingPage.scss'

const NothingPage = (props) => {
    return (
        (
            <div className="nothing">
                <div className="nothing-content">
                    <div className="nothing-content-background-list" style={{backgroundImage:`url(${props.model.imageUrl})`}}></div>
                    <div className="nothing-content-big-message">{props.model.bigMessage}</div>
                    <div className="nothing-content-small-message">{props.model.smallMessage}</div>
                </div>
                {props.showActionButton && (<div className="nothing-action-button" onClick={() => props.action && props.action()}>点此参与活动</div>)}
            </div>
        )
    )
}

export default NothingPage