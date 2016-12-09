
import React from 'react'
import {connect} from 'react-redux';
import LoadingButton from 'loadingButton';
import './modifyPasswordByCode.scss'

class ModifyPasswordByCode extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isSaving:false
        };
    }

    handleSave(){

    }

    render(){
        return (
            <div className="modify-password-code">
                <div className="modify-title-container">
                    <div className="image">
                        <img src={require("password_light")}/>
                    </div>
                    <div className="title">登陆密码</div>
                </div>
                <div className="input-base">
                    <div className="label">新密码</div>
                    <input type="text" ref="newPassword" />
                </div>
                <div className="input-base">
                    <div className="label">再次输入</div>
                    <input type="text" ref="confirmPassword"/>
                </div>
                <LoadingButton text="确认修改" loadingText="正在为您保存..." status={this.state.isSaving}
                               onClick={() => this.handleSave()}/>
            </div>
        );
    }
}

export default connect()(ModifyPasswordByCode);