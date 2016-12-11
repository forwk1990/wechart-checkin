import React from 'react'
import {connect} from 'react-redux';
import {Picker} from 'antd-mobile';
import LoadingButton from 'loadingButton';
import './modifyAddress.scss'
import {MessageBox, Validator} from 'Utils';
import DataStore from 'DataStore';
import ActionTypes from 'constants/ActionTypes';

class ModifyAddress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSaving: false,
            data: [],
            isDataLoading: false,
            isDataReady: false,
            value: []
        }
    }

    handleClick() {
        const self = this;
        if (self.state.isDataReady)return;
        self.setState({isDataLoading: true});
        DataStore.getProvince({}).then(function (responseObject) {
            self.isDataReady = true;
            self.setState({isDataLoading: false});
            self.setState({data: responseObject, value: self.props.value});
        }, function (error) {
            self.setState({isDataLoading: false});
        })
    }

    handleChange(val) {

    }

    handleSave() {

    }

    render() {
        return (
            <div className="modify-address">
                <div className="modify-title-container">
                    <div className="image">
                        <img src={require("address_light")}/>
                    </div>
                    <div className="title">联系地址</div>
                </div>
                <Picker style={{fontSize: "24px"}} cols={3} data={this.state.data} value={this.state.value}
                        title="选择省市区" onChange={ (val) => this.handleChange(val)}>
                    <div className="modify-address-picker-item" onClick={() => this.handleClick()}>
                        <div className="title">选择省市区</div>
                        {
                            !this.state.hasInitialValue ? (<div className="extra"></div>) : (
                                <div className="extra"></div>)
                        }
                        <img src={require("../../assets/images/arrow_right.png")}/>
                    </div>
                </Picker>
                <div className="input-base">
                    <div className="label">详细地址</div>
                    <input type="text" ref="detail"/>
                </div>
                <LoadingButton text="保存" loadingText="正在为您保存..." status={this.state.isSaving}
                               onClick={() => this.handleSave()}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        province: state.userInfoReducer.province,
        address: state.userInfoReducer.address /*微信号码*/
    }
}

export default connect(mapStateToProps)(ModifyAddress);