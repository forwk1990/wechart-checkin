import React from 'react'
import {connect} from 'react-redux';
import LoadingButton from 'loadingButton';
import './modifyId.scss'

class ModifyId extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSaving: false
        };
    }

    handleSave() {

    }

    render() {
        return (
            <div className="modify-id">
                <div className="modify-title-container">
                    <div className="image">
                        <img src={require("sm_light")}/>
                    </div>
                    <div className="title">实名认证</div>
                </div>
                <div className="input-base">
                    <div className="label">姓名</div>
                    {
                        this.props.name ? (<div className="value">{this.props.name}</div>) : (<input className="value" type="text" ref="name"/>)
                    }
                </div>
                <div className="input-base">
                    <div className="label">身份证号</div>
                    {
                        this.props.IDNumber ? (<div className="value">{this.props.IDNumber}</div>) : (<input className="value" type="text" ref="id"/>)
                    }
                </div>
                {!this.props.name && (<div><LoadingButton text="确认" loadingText="正在为您保存..." status={this.state.isSaving}
                                                         onClick={() => this.handleSave()}/>
                    <div className="modify-msg">请如实填写认证信息，一旦确认不可更改</div>
                </div>)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.userInfoReducer.name, /*微信号码*/
        IDNumber: state.userInfoReducer.IDNumber /*微信号码*/
    }
}

export default connect(mapStateToProps)(ModifyId);