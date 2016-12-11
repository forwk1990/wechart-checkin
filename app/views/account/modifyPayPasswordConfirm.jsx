
import React from 'react'
import {connect} from 'react-redux';
import LoadingButton from 'loadingButton';
import './modifyPasswordConfirm.scss'
import {MessageBox, Validator} from 'Utils';
import DataStore from 'DataStore';
import ActionTypes from 'constants/ActionTypes';

class ModifyPayPasswordConfirm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isSaving:false
        };
    }

    handleSave(){
        const self = this;
        let password = this.refs["password"].value;
        let confirmPassword = this.refs["confirmPassword"].value;
        if (!password) {
            MessageBox.show("支付密码");
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
        DataStore.modifyPayPassword({payPassword: confirmPassword,id:self.props.id}).then(function () {
            self.setState({isSaving: false});
            self.props.dispatch({type: ActionTypes.modifyPayPassword,payPassword:confirmPassword});
            self.context.router.goBack();
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
                    <div className="label">支付密码</div>
                    <input type="password" ref="password" />
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

ModifyPayPasswordConfirm.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        id: state.userInfoReducer.id
    }
}

export default connect(mapStateToProps)(ModifyPayPasswordConfirm);