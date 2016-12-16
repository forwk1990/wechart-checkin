
import React from 'react'
import {connect} from 'react-redux';
import LoadingButton from 'loadingButton';
import './modifyPasswordByCode.scss'
import {MessageBox, Validator} from 'Utils';
import DataStore from 'DataStore';
import {hashHistory} from 'react-router';
import ActionTypes from 'constants/ActionTypes';

class ModifyPayPasswordByCode extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isSaving:false
        };
    }

    handleSave(){
        const self = this;
        let password = this.refs["newPassword"].value;
        let confirmPassword = this.refs["confirmPassword"].value;
        if (!password) {
            MessageBox.show("请输入支付密码");
            return;
        }
        if (!confirmPassword) {
            MessageBox.show("请确认支付密码");
            return;
        }
        if (password != confirmPassword) {
            MessageBox.show("您两次输入的密码不一致");
            return;
        }
        self.setState({isSaving: true});
        DataStore.modifyPayPassword({payPassword: md5(confirmPassword),id:self.props.id}).then(function () {
            self.setState({isSaving: false});
            self.props.dispatch({type: ActionTypes.modifyPayPassword,payPassword:md5(confirmPassword)});
            hashHistory.go(-2);
        }, function () {
            self.setState({isSaving: false});
        });
    }

    render(){
        return (
            <div className="modify-password-code">
                <div className="modify-title-container">
                    <div className="image">
                        <img src={require("password_light")}/>
                    </div>
                    <div className="title">支付密码</div>
                </div>
                <div className="modify-password-code-input-base">
                    <div className="label">新密码</div>
                    <input type="password" ref="newPassword" />
                </div>
                <div className="modify-password-code-input-base">
                    <div className="label">再次输入</div>
                    <input type="password" ref="confirmPassword"/>
                </div>
                <LoadingButton text="确认修改" loadingText="正在为您保存..." status={this.state.isSaving}
                               onClick={() => this.handleSave()}/>
            </div>
        );
    }
}

ModifyPayPasswordByCode.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        id: state.userInfoReducer.id
    }
}

export default connect(mapStateToProps)(ModifyPayPasswordByCode);