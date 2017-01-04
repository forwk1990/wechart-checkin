
import React from 'react'
import {connect} from 'react-redux';
import LoadingButton from 'loadingButton';
import './ModifyMail.scss'
import {MessageBox,Validator} from 'Utils';
import DataStore from 'DataStore';
import ActionTypes from 'constants/ActionTypes';

class ModifyMail extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isSaving:false,
            email: this.props.email
        };
    }

    handleChange() {
        this.setState({email: this.refs["email"].value});
    }

    handleSave() {
        const self = this;
        const value = this.refs["email"].value;
        if (!value) {
            MessageBox.show("邮箱不能为空");
            return;
        }
        if(!Validator.isRegularEmail(value)){
            MessageBox.show("邮箱地址格式不正确");
            return;
        }
        this.setState({isSaving: true});
        DataStore.modifyEmail({id: this.props.id, email: value}).then(function () {
            self.setState({isSaving: false});
            self.props.dispatch({type: ActionTypes.modifyEmail, email: value});
            self.context.router.goBack();
        }, function (error) {
            self.setState({isSaving: false});
            MessageBox.show(error.message);
        });
    }

    render(){
        return (
            <div className="modify-mail">
                <div className="modify-title-container">
                    <div className="image">
                        <img src={require("email_light")}/>
                    </div>
                    <div className="title">联系邮箱</div>
                </div>
                <div className="modify-mail-input-base">
                    <div className="label">联系邮箱</div>
                    {
                        this.state.isSaving ? (<input type="text" value={this.state.email} disabled="disabled"/>):
                            (<input className="value" type="text" ref="email" value={this.state.email}
                                    onChange={ () => this.handleChange()}/>)
                    }
                </div>
                <LoadingButton text="保存" loadingText="正在为您保存..." status={this.state.isSaving}
                               onClick={() => this.handleSave()}/>
                <div className="modify-msg">更改联系邮箱,点击保存即可</div>
            </div>
        );
    }
}

ModifyMail.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        id:state.userInfoReducer.id,
        email: state.userInfoReducer.email /*微信号码*/
    }
}

export default connect(mapStateToProps)(ModifyMail);