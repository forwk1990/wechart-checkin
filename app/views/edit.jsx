import React from 'react';
import {InputItem, Picker, List} from 'antd-mobile';
import CheckBox from './checkbox.jsx';
import RadioBox from './radiobox.jsx';
import OptionType from 'constants/OptionType.js'
import DataStore from 'DataStore'
import './edit.scss'
import LoadingButton from 'loadingButton';
import {RouteTransition, presets} from 'react-router-transition';

class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'isReady': false,
            'status':0,
            options: []
        };
    }

    componentDidMount() {
        var self = this;
        DataStore.getEdit({code: '', id: ''}).then(function (responseObject) {
            self.setState({options: responseObject,"isReady":true});
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
        this.setState({status:1});
        DataStore.checkin({}).then(function (responseObject) {
            console.info(responseObject);
            self.setState({status:0});
            self.context.router.push(`success`);
        });
    }

    render() {
        return !this.state.isReady ? (<div className="loading"></div>)
            : (
            <RouteTransition
                component={false}
                pathname={this.props.location.pathname}
                {...presets.fade}>
                <div className="edit">
                    <span className="edit-hello">您好 万德武</span>
                    <p className="desc">完善您个人的资料，我们会根据您的信息为您提供针对性的服务，并且我们承诺保护您的隐私安全.</p>
                    <div className="topline"></div>
                    <List>
                        {
                            this.state.options.map(function (option, index) {
                                switch (option.type) {
                                    case OptionType.Select:
                                        return (
                                            <Picker key={index} style={{fontSize: "24px"}} cols={1}
                                                    data={option.options}
                                                    title={"请选择" + option.title}
                                                    extra="  ">
                                                <List.Item style={{paddingLeft: "0px"}}
                                                           arrow="horizontal">{option.title}</List.Item>
                                            </Picker>
                                        );
                                    case OptionType.Text:
                                        return (
                                            <InputItem key={index} style={{paddingLeft: "0px", textAlign: "right"}}>{option.title}</InputItem>
                                        );
                                    case OptionType.Checkbox:
                                        return (
                                            <CheckBox key={index} title={option.title} items={option.options}/>
                                        );
                                    case OptionType.Radiobox:
                                        return (
                                            <RadioBox key={index} title={option.title} items={option.options}/>
                                        );
                                }
                            })
                        }
                    </List>
                    <LoadingButton text="提交资料" loadingText="正在为您提交..." status={this.state.status} onClick={()=>this.handleSubmit()}/>
                </div>
            </RouteTransition>
        );
    }

}

Edit.contextTypes = {
    router: React.PropTypes.object
}

export default Edit;