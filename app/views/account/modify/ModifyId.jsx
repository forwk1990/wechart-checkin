import React from 'react'
import {connect} from 'react-redux';
import LoadingButton from 'loadingButton';
import {MessageBox, Validator} from 'Utils';
import DataStore from 'DataStore';
import ActionTypes from 'constants/ActionTypes';
import './ModifyId.scss'

class ModifyId extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSaving: false
        };
    }

    handleSave() {
        const self = this;
        let name = this.refs["name"].value;
        let id = this.refs["id"].value;
        if (!name) {
            MessageBox.show("请输入您的姓名");
            return;
        }
        if (!id) {
            MessageBox.show("请输入您的身份证号码");
            return;
        }
        if (!Validator.isRegularID(id)) {
            MessageBox.show("请输入正确的身份证号码");
            return;
        }
        self.setState({isSaving: true});
        DataStore.modifyIDNumber({id: self.props.id, name: name, IDNumber: id}).then(function () {
            self.setState({isSaving: false});
            self.props.dispatch({type: ActionTypes.modifyIDNumber, name: name, IDNumber: id});
            self.context.router.goBack();
        }, function () {
            self.setState({isSaving: false});
        });
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
                <div className="modify-id-input-base">
                    <div className="label">姓名</div>
                    {
                        this.props.name ? (<div className="value">{this.props.name}</div>) : (
                            <input className="value" type="text" ref="name"/>)
                    }
                </div>
                <div className="modify-id-input-base">
                    <div className="label">身份证号</div>
                    {
                        this.props.IDNumber ? (<div className="value">{this.props.IDNumber}</div>) : (
                            <input className="value" type="text" ref="id"/>)
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

ModifyId.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        id: state.userInfoReducer.id,
        name: state.userInfoReducer.name, /*微信号码*/
        IDNumber: state.userInfoReducer.IDNumber /*微信号码*/
    }
}

export default connect(mapStateToProps)(ModifyId);