import React from 'react';
import 'validate.scss';
import DataStore from 'DataStore'
import QueryString from 'query-string'

class Validate extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isReady:false,
            isSuccess:false
        };
    }

    componentDidMount(){

        const self = this;
        const ticketNo = this.props.params.code;

        DataStore.validate({ticketNo:ticketNo}).then(function (responseObject) {
            console.info(responseObject);
            self.setState({isReady:true,isSuccess:true});
        },function(error){
            self.setState({isReady:true,isSuccess:false});
        });
    }

    handleClick(){
        wx.closeWindow();
    }

    handleContinue(){
        wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                console.info(result);
            },
            fail:function(error){
                console.info(error);
            }
        });
    }

    render() {
        return !this.state.isReady ? (<div className="loading"></div>)
            :(
            <div className="page-validate">
                <div className="page-validate-msg">
                    <div className="page-validate-msg-icon-area">
                        <i className={`page-validate-msg-icon-area-${this.state.isSuccess ? "success" : "failure"}`}></i>
                    </div>
                    <div className="page-validate-msg-text-area">
                        <h2 className="page-validate-msg-text-area-title">
                            {
                                this.state.isSuccess ? "验证通过" : "无效的票据"
                            }
                        </h2>
                    </div>
                    <div className="page-validate-msg-opr-area">
                        <div className="page-validate-msg-opr-area-continue" onClick={this.handleContinue.bind(this)}>验证下一个</div>
                        <div className="page-validate-msg-opr-area-close" onClick={this.handleClick.bind(this)}>关闭</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Validate;