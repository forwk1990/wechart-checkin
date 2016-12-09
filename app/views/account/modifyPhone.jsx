
import React from 'react'
import {connect} from 'react-redux';
import LoadingButton from 'loadingButton';
import './modifyPhone.scss'

class ModifyPhone extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isSaving:false
        };
    }

    handleSave(){
        this.context.router.push("mine/modifyPhoneConfirm");
    }

    render(){
        return (
            <div className="modify-phone">
                <div className="modify-title-container">
                    <div className="image">
                        <img src={require("phone_light")}/>
                    </div>
                    <div className="title">联系手机</div>
                </div>
                <div className="input-base">
                    <div className="label">手机号</div>
                    <input type="text" ref="phone" value={this.props.phone} disabled="disabled"/>
                </div>
                <LoadingButton text="更改联系手机" loadingText="正在为您保存..." status={this.state.isSaving}
                               onClick={() => this.handleSave()}/>
            </div>
        );
    }
}


ModifyPhone.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        phone: state.userInfoReducer.phone /*微信号码*/
    }
}

export default connect(mapStateToProps)(ModifyPhone);