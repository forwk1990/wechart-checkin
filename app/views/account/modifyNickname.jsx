import React from 'react'
import './modifyNickname.scss'
import {connect} from 'react-redux';
import LoadingButton from 'loadingButton';
import {MessageBox} from 'Utils';
import DataStore from 'DataStore';
import ActionTypes from 'constants/ActionTypes';

class ModifyNickname extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSaving: false,
            nickname: this.props.nickname
        };
    }

    handleChange() {
        this.setState({nickname: this.refs["nickname"].value});
    }

    handleSave() {
        const self = this;
        const value = this.refs["nickname"].value;
        if (!value) {
            MessageBox.show("昵称不能为空");
            return;
        }
        this.setState({isSaving: true});
        DataStore.modifyNickname({id: this.props.id, nickname: value}).then(function () {
            self.setState({isSaving: false});
            self.props.dispatch({type: ActionTypes.modifyNickname, nickname: value});
            self.context.router.goBack();
        }, function (error) {
            self.setState({isSaving: false});
            MessageBox.show(error.message);
        });
    }

    render() {
        return (
            <div className="modify-nickname">
                <div className="modify-title-container">
                    <div className="title">昵称</div>
                </div>
                <div className="modify-nickname-input-base">
                    <div className="label">昵称</div>
                    {
                        this.state.isSaving ? (<input className="value" type="text" value={this.state.nickname} disabled="disabled"/>):
                            (<input className="value" type="text" ref="nickname" value={this.state.nickname} maxLength="15"
                                    onChange={ () => this.handleChange()}/>)
                    }
                </div>
                <LoadingButton text="更改昵称" loadingText="正在为您保存..." status={this.state.isSaving}
                               onClick={() => this.handleSave()}/>
            </div>
        );
    }
}


ModifyNickname.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        id: state.userInfoReducer.id,
        nickname: state.userInfoReducer.nickname /*微信号码*/
    }
}

export default connect(mapStateToProps)(ModifyNickname);