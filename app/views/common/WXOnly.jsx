
import React from 'react'
import './WXOnly.scss'


class WXOnly extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="wx-only">
                <div className="wx-only-msg">
                    <div className="wx-only-msg-icon-area">
                        <i className='weui-icon-info'></i>
                    </div>
                    <div className="wx-only-msg-text-area">
                        <h2 className="wx-only-msg-text-area-title">
                            请在微信客户端打开连接
                        </h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default WXOnly