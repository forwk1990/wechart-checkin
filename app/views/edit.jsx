import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { createForm } from 'rc-form';
import {Flex, NavBar, Icon, InputItem, Picker, List} from 'antd-mobile';
import CheckBox from './checkbox.jsx';
import RadioBox from './radiobox.jsx';
import OptionType from 'constants/OptionType.js'
import DataStore from 'DataStore'
import './edit.scss'

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: []
        };
    }

    /*
     *
     * */
    componentDidMount() {
        var self = this;
        DataStore.getEdit({code: '', id: ''}).then(function (responseObject) {
            self.setState({options:responseObject});
        }, function (error) {
            console.info(error);
        });

    }

    render() {
        const { getFieldProps } = this.props.form;

        return (
            <div className="edit">
                <span className="edit-hello">您好 万德武</span>

                <p className="desc">完善您个人的资料，我们会根据您的信息为您提供针对性的服务，并且我们承诺保护您的隐私安全.</p>

                <div className="topline"></div>
                <List>
                    {
                        this.state.options.map(function (option,index) {
                            switch (option.type) {
                                case OptionType.Select:
                                    return (
                                        <Picker key={index} style={{fontSize:"24px"}} cols={1} extra="" data={option.options}
                                                title={"请选择"+option.title}
                                            {...getFieldProps('district')}>
                                            <List.Item style={{paddingLeft:"0px"}} arrow="horizontal">{option.title}</List.Item>
                                        </Picker>
                                    );
                                case OptionType.Text:
                                    return (
                                        <InputItem key={index} style={{paddingLeft:"0px",textAlign:"right"}}
                                            {...getFieldProps('control')}>{option.title}</InputItem>
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
                <a href="#" className="edit-submit">提交资料</a>
            </div>
        );
    }

}

export default createForm()(Edit);

//<Picker style={{fontSize:"24px"}} cols={1} extra="" data={district} title="请选择年龄段"
//    {...getFieldProps('district')}>
//    <List.Item style={{paddingLeft:"0px"}} arrow="horizontal">性别</List.Item>
//</Picker>
//<InputItem style={{paddingLeft:"0px",textAlign:"right"}}
//    {...getFieldProps('control')}>微信号</InputItem>
//<Picker style={{fontSize:"24px"}} cols={1} extra="" data={district} title="请选择年龄段"
//    {...getFieldProps('district')}>
//    <List.Item style={{paddingLeft:"0px"}} arrow="horizontal">所在省市</List.Item>
//</Picker>
//<Picker style={{fontSize:"24px"}} cols={1} extra="" data={district} title="请选择年龄段"
//    {...getFieldProps('district')}>
//    <List.Item style={{paddingLeft:"0px"}} arrow="horizontal">所在区县</List.Item>
//</Picker>
//<InputItem style={{paddingLeft:"0px",textAlign:"right"}}
//    {...getFieldProps('control')}>工作单位</InputItem>
//<InputItem style={{paddingLeft:"0px",textAlign:"right"}}
//    {...getFieldProps('control')}>职位</InputItem>
//<Picker style={{fontSize:"24px"}} cols={1} extra="" data={district} title="请选择年龄段"
//    {...getFieldProps('district')}>
//    <List.Item style={{paddingLeft:"0px"}} arrow="horizontal">学历</List.Item>
//</Picker>
//<CheckBox title={title} items={items}/>
//<RadioBox title={title} items={items}/>