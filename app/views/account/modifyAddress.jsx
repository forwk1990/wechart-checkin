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
            initialValue: this.props.provinceLabel,
            address: this.props.address,
            value: []
        }
    }

    handleClick() {
        const self = this;
        if (self.state.isDataReady)return;
        self.setState({isDataLoading: true});
        DataStore.getProvince({}).then(function (responseObject) {
            self.isDataReady = true;
            self.setState({
                isDataLoading: false,
                data: responseObject,
                value: self.props.provinceValues
            });
        }, function (error) {
            self.setState({isDataLoading: false});
        })
    }

    handleChange(val) {
        this.setState({value: val, initialValue: this.getProvince(this.state.data, [], val, 0).join('')});
    }

    handleInputChange() {
        this.setState({address: this.refs["address"].value});
    }

    getProvince(array, selArray, val, deep) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].value == val[deep]) {
                selArray.push(array[i].label);
                if (array[i].children) {
                    this.getProvince(array[i].children, selArray, val, ++deep);
                }
                break;
            }
        }
        return selArray;
    }

    handleSave() {
        const self = this;
        const address = self.refs["address"].value;
        if (!address) {
            MessageBox.show("请输入详细地址");
            return;
        }

        const provinceValues = self.state.value;
        const provinceLabel = self.state.initialValue;

        console.log(address, provinceValues, provinceLabel);
        self.setState({isSaving: true});
        DataStore.modifyAddress({
            id: self.state.id,
            address: address,
            provinceValues: provinceValues,
            provinceLabel: provinceLabel
        }).then(function () {
            self.setState({isSaving: false});
            self.props.dispatch({
                type: ActionTypes.modifyAddress,
                address: address,
                provinceValues: provinceValues,
                provinceLabel: provinceLabel
            });
            self.context.router.goBack();
        }, function () {
            self.setState({isSaving: false});
        });
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
                            !this.state.initialValue ? (<div className="extra"></div>) : (
                                <div className="extra">{this.state.initialValue}</div>)
                        }
                        <img src={require("../../assets/images/arrow_right.png")}/>
                    </div>
                </Picker>
                <div className="modify-address-input-base">
                    <div className="label">详细地址</div>
                    <input type="text" ref="address" value={this.state.address}
                           onChange={ () => this.handleInputChange()}/>
                </div>
                <LoadingButton text="保存" loadingText="正在为您保存..." status={this.state.isSaving}
                               onClick={() => this.handleSave()}/>
            </div>
        );
    }
}

ModifyAddress.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        id: state.userInfoReducer.id,
        provinceLabel: state.userInfoReducer.provinceLabel,
        provinceValues: state.userInfoReducer.provinceValues,
        address: state.userInfoReducer.address /*微信号码*/
    }
}

export default connect(mapStateToProps)(ModifyAddress);