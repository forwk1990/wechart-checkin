
import React from 'react'
import {connect} from 'react-redux';
import LoadingButton from 'loadingButton';
import './modifyWechart.scss'
import {MessageBox} from 'Utils';
import DataStore from 'DataStore';
import ActionTypes from 'constants/ActionTypes';

class ModifyWechart extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isSaving:false,
            wx: this.props.wx
        };
    }

    handleChange() {
        this.setState({wx: this.refs["wx"].value});
    }

    handleSave() {
        const self = this;
        const value = this.refs["wx"].value;
        if (!value) {
            MessageBox.show("微信号不能为空");
            return;
        }
        this.setState({isSaving: true});
        DataStore.modifyWx({id: this.props.id, wx: value}).then(function () {
            self.setState({isSaving: false});
            self.props.dispatch({type: ActionTypes.modifyWx, wx: value});
            self.context.router.goBack();
        }, function (error) {
            self.setState({isSaving: false});
            MessageBox.show(error);
        });
    }

    render(){
        return (
            <div className="modify-wx">
                <div className="modify-title-container">
                    <div className="image">
                        <img src={require("wx_light")}/>
                    </div>
                    <div className="title">联系微信</div>
                </div>
                <div className="modify-wx-input-base">
                    <div className="label">微信号码</div>
                    {
                        this.state.isSaving ? (<input type="text" value={this.state.wx} disabled="disabled"/>):
                            (<input className="value" type="text" ref="wx" value={this.state.wx}
                                    onChange={ () => this.handleChange()}/>)
                    }
                </div>
                <LoadingButton text="保存" loadingText="正在为您保存..." status={this.state.isSaving}
                               onClick={() => this.handleSave()}/>
                <div className="modify-msg">更改联系微信,点击保存即可</div>
            </div>
        );
    }
}

ModifyWechart.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        wx: state.userInfoReducer.wx /*微信号码*/
    }
}

export default connect(mapStateToProps)(ModifyWechart);