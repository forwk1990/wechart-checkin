
import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './QRCodeModal.scss'


function ModalContent(props) {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
}

class QRCodeModal extends React.Component {

    constructor(props) {
        super(props)
    }

    handleClick() {
        if (this.props.onClose) this.props.onClose();
    }

    render() {
        return (
            <div className="qr-modal" key="qr-modal">
                <div className="qr-modal-bg" onClick={() => this.handleClick()}></div>
                <ReactCSSTransitionGroup
                    transitionEnter={false}
                    transitionLeave={true} transitionLeaveTimeout={800}
                    transitionAppear={true} transitionAppearTimeout={1000}
                    transitionName={ {
                        leave: 'modal-leave',
                        leaveActive: 'modal-leave-active',
                        appear: 'modal-appear',
                        appearActive: 'modal-appear-active'
                    } } component={ModalContent}>
                    <div className="qr-modal-content">
                        <div className="qr-modal-content-close">
                            <img src={require('close')} onClick={() => this.handleClick()}/>
                        </div>
                        <div className="qr-modal-content-container">
                            <img src={require('xyqrcode')}/>
                        </div>
                        <div className="qr-modal-content-message">长按二维码关注，体验更多功能</div>
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        )
    }

}

export default QRCodeModal