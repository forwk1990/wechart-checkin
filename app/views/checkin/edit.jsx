import React from 'react';
import {InputItem, Picker, Toast, List} from 'antd-mobile';
import CheckBox from 'common/checkbox.jsx';
import RadioBox from 'common/radiobox.jsx';
import OptionType from 'constants/OptionType.js'
import DataStore from 'DataStore';
import {MessageBox} from 'Utils';
import LoadingButton from 'common/loadingButton';
import QueryString from 'query-string';
import {createForm} from 'rc-form';
import {connect} from 'react-redux';
import {RouteTransition, presets} from 'react-router-transition';
import './edit.scss';

class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'isReady': false,
            'status': 0,
            options: []
        };
    }

    componentDidMount() {
        var self = this;
        const queryParameters = QueryString.parse(location.search);
        if (!queryParameters.id) return;

        DataStore.getEdit({id: queryParameters.id}).then(function (responseObject) {
            self.setState({options: responseObject, "isReady": true});
            $(".am-list-extra").addClass("normal-input-font-style");
        }, function (error) {
            console.info(error);
        });

    }

    handleChange(name, val) {
        console.info(name);
        const inputValueObject = {};
        inputValueObject[name] = val;
        this.setState(inputValueObject);
        name == "inputValue_ageGroup" && $(".am-list-extra").addClass("normal-input-font-style");
    }

    handleSubmit() {
        var self = this;
        const names = self.state.options.map(function (option) {
            return option.id;
        });
        const values = this.props.form.getFieldsValue(names);
        var validated = true;
        for (var propertyName in values) {
            const value = values[propertyName];
            if (!value || value.length < 1) {
                validated = false;
            }
        }

        if (!validated) {
            MessageBox.show('您的资料未填写完全，请检查');
            return;
        }

        this.setState({status: 1});
        DataStore.fill({...values, uid: self.props.uid}).then(function (responseObject) {
            console.info(responseObject);
            self.setState({status: 0});
            self.context.router.push(`success`);
        });
    }

    handleBoxChange(name, value) {
        const fieldObject = {};
        fieldObject[name] = value;
        this.props.form.setFieldsValue(fieldObject);
    }

    getMaxColumns(option, columns) {
        if (!option) return 0;
        if (option.children && option.children.length > 0) {
            columns = this.getMaxColumns(option.children[0], ++columns);
        }
        return columns;
    }

    render() {
        var self = this;
        const {getFieldProps} = this.props.form;
        console.info(this.props.uid);
        return !this.state.isReady ? (<div className="loading"></div>)
            : (
            <RouteTransition
                component={false}
                pathname={this.props.location.pathname}
                {...presets.fade}>
                <div className="edit">
                    <span className="edit-hello">您好</span>
                    <p className="desc">完善您个人的资料，我们会根据您的信息为您提供针对性的服务，并且我们承诺保护您的隐私安全.</p>
                    <div className="topline"></div>
                    <List>
                        {
                            this.state.options.map(function (option, index) {
                                switch (option.type) {
                                    case OptionType.Select:
                                        console.info(option);
                                        const columns = self.getMaxColumns(option.options[0], 1);
                                        return (
                                            <Picker key={index} style={{fontSize: "24px"}} cols={columns}
                                                    data={option.options}
                                                    title={"请选择" + option.title}
                                                    extra="  "
                                                    {...getFieldProps(option.id)}>
                                                <List.Item style={{paddingLeft: "0px"}}
                                                           arrow="horizontal">{option.title}</List.Item>
                                            </Picker>
                                        );
                                    case OptionType.Text:
                                        return (
                                            <InputItem key={index} style={{paddingLeft: "0px", textAlign: "right"}}
                                                       {...getFieldProps(option.id)}>{option.title}</InputItem>
                                        );
                                    case OptionType.Checkbox:
                                        return (
                                            <CheckBox key={index} title={option.title} items={option.options}
                                                      {...getFieldProps(option.id)}
                                                      onChange={(value) => self.handleBoxChange(option.id, value)}/>
                                        );
                                    case OptionType.Radiobox:
                                        return (
                                            <RadioBox key={index} title={option.title} items={option.options}
                                                      {...getFieldProps(option.id)}
                                                      onChange={(value) => self.handleBoxChange(option.id, value)}/>
                                        );
                                }
                            })
                        }
                    </List>
                    <LoadingButton text="提交资料" loadingText="正在为您提交..." status={this.state.status}
                                   onClick={() => this.handleSubmit()}/>
                </div>
            </RouteTransition>
        );
    }
}

Edit.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        uid: state.checkInReducer.uid
    }
}

export default createForm()(connect(mapStateToProps)(Edit));