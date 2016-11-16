
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './Tab.scss'

import DataStore from '../../libs/components/DataStore.js'

function stringFormat() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}

const cells1 = [
    {
        text:"不忘初心，人胖多砍价，人笨多砍价，一口气砍掉<span>{0}</span>元",
        money:1500,
        imageUrl:"http://tse1.mm.bing.net/th?&id=OIP.Mbf81ef4767cdf874414933f16f321e86o1&w=226&h=300&c=0&pid=1.9&rs=0&p=0&r=0"
    },
    {
        text:"小溪，说待我长发及腰时再砍，帮你砍掉<span>{0}</span>元",
        money:200,
        imageUrl:"http://img3.imgtn.bdimg.com/it/u=3419798110,2614926993&fm=11&gp=0.jpg"
    },
    {
        text:"Uchiha Itachi,你问我爱你有多深，砍价代表我的心，帮你砍掉<span>{0}</span>元",
        money:4600,
        imageUrl:"http://tse1.mm.bing.net/th?id=OIF.QFi8PUwFGRV3NWmi3xipFw&w=164&h=150&c=7&rs=1&qlt=90&o=4&pid=1.1"
    },
    {
        text:"snail,帮你砍掉<span>34.27</span>元,我和我的小伙伴都惊呆了！",
        money:1500,
        imageUrl:"http://tse2.mm.bing.net/th?id=OIP.Mb43b2b47a3d879695bb1c68a33c579d0o0&w=188&h=130&c=7&rs=1&qlt=90&o=4&pid=1.1"
    },
    {
        text:"Mars，说专治各种砍价，不服来砍，帮你砍掉<span>35.02</span>元!",
        money:1500,
        imageUrl:"http://tse1.mm.bing.net/th?&id=OIP.M3a8fa550ab36ad61523395de99cb4ecdo0&w=300&h=296&c=0&pid=1.9&rs=0&p=0&r=0"
    }
];

/*
 * 好友数据格式 ：
 *
   {
    text:"不忘初心，人胖多砍价，人笨多砍价，一口气砍掉<span>{0}</span>元",
    money:800,
    imageUrl:"http://tse1.mm.bing.net/th?&id=OIP.Mbf81ef4767cdf874414933f16f321e86o1&w=226&h=300&c=0&pid=1.9&rs=0&p=0&r=0"
   }
 * @field text:参与该活动的好友的文本模版
 * @field money:好友帮你砍了多少钱
 * @field imageUrl:用户头像地址
 * @discussion text中<span>{0}</span>为固定格式，{0}为占位符,前半部分为好友名与随机字符串拼接。
 *     如：
 *     1、Uchiha Itachi,你问我爱你有多深，砍价代表我的心，帮你砍掉
 *     2、不忘初心，人胖多砍价，人笨多砍价，一口气砍掉
 *
 * */

/*
* 参与榜数据格式 ：
*
  {
    text:"不忘初心，已砍掉800元,<span>当前金额{0}元</span>",
    money:800,
    imageUrl:"http://tse1.mm.bing.net/th?&id=OIP.Mbf81ef4767cdf874414933f16f321e86o1&w=226&h=300&c=0&pid=1.9&rs=0&p=0&r=0"
  }
* @field text:参与该活动的用户的模版
* @field money:该用户当前砍到多少钱
* @field imageUrl:用户头像地址
* @discussion：text中<span>当前金额{0}元</span>为固定格式，{0}为占位符,前半部分为好友名与砍掉金额拼接
*      如：
*      1、不忘初心，已砍掉800元,
*      2、小溪，已砍掉700元,
*
* */
const cells2 = [
    {
        text:"不忘初心，已砍掉800元,<span>当前金额{0}</span>元",
        money:800,
        imageUrl:"http://tse1.mm.bing.net/th?&id=OIP.Mbf81ef4767cdf874414933f16f321e86o1&w=226&h=300&c=0&pid=1.9&rs=0&p=0&r=0"
    },
    {
        text:"小溪，已砍掉700元,<span>当前金额{0}</span>元",
        money:700,
        imageUrl:"http://img3.imgtn.bdimg.com/it/u=3419798110,2614926993&fm=11&gp=0.jpg"
    },
    {
        text:"Uchiha Itachi,已砍掉600元,<span>当前金额{0}</span>元",
        money:600,
        imageUrl:"http://tse1.mm.bing.net/th?id=OIF.QFi8PUwFGRV3NWmi3xipFw&w=164&h=150&c=7&rs=1&qlt=90&o=4&pid=1.1"
    },
    {
        text:"Hey，已砍掉500元，<span>当前金额{0}</span>元",
        money:500,
        imageUrl:"http://tse2.mm.bing.net/th?id=OIP.Mb43b2b47a3d879695bb1c68a33c579d0o0&w=188&h=130&c=7&rs=1&qlt=90&o=4&pid=1.1"
    },
    {
        text:"fion，已砍掉400元,<span>当前金额{0}</span>元",
        money:400,
        imageUrl:"http://tse1.mm.bing.net/th?&id=OIP.M3a8fa550ab36ad61523395de99cb4ecdo0&w=300&h=296&c=0&pid=1.9&rs=0&p=0&r=0"
    }
];

class TabPageTableView extends Component{

    constructor(props){
        super(props);
    }

    render(){
        var cellsHtml = this.props.cells.map(function(cell,index){
            const messageHtml = {__html: stringFormat(cell.text,cell.money)};
            return (
                <div className="row cell" key={index}>
                    <div className="small-2 columns padding-clear">
                        <img src={cell.imageUrl}/>
                    </div>
                    <div className="small-10 columns padding-clear">
                        <p dangerouslySetInnerHTML={messageHtml} />
                    </div>
                </div>
            );
        });
        var className = "small-12 columns padding-clear tab-page-tableView"
        if(this.props.index == this.props.selectedIndex){
            className = className + " active";
        }
        return (
            <div className={className}>
                {cellsHtml}
            </div>
        );
    }
}

class TabPageRulePage extends Component{

    constructor(props){
        super(props);
    }

    render(){
        var className = "small-12 columns padding-clear rule-page"
        if(this.props.index == this.props.selectedIndex){
            className = className + " active";
        }
        return (
            <div className={className}>
                <p>
                    1) 188元红包仅限从未在京东下单的新用户领取，每个用户仅限领取1次;<br/><br/>
                    2) 用户在页面完成短信验证可领取68元组合优惠券，通过实名认证可领取120元组合优惠券。部分幸运用户有机会省略短信验证直接领取68元组合优惠券，极少数幸运用户有机会直接通过实名认证一键领取全部188元红包；<br/><br/>
                    3) 短信验证时，会给当前登录的京东账号所绑定的手机号发送短信，请注意查收。实名认证需提供姓名、身份证、银行卡及银行卡预留手机号。实名后可升级账户安全，实名认证所填写的信息将保密存储。京东不会以任何方式索要您的银行密码等信息，请注意安全谨防诈骗；<br/><br/>
                    4) 红包中优惠券的有效期及具体使用规则信息可点击页面“查看已领优惠券”去往我的优惠券页面查看，或从京东首页进入 “我的京东--优惠券”页面查看；如偶遇发放延迟，请您耐心等待；<br/><br/>
                    5) 红包内含多张优惠券，过期未使用自动失效，优惠券具体面额及其有效期以实际到账为准，请及时用券；<br/><br/>
                    6) 红包中优惠券在全平台（手机京东、PC、微信京东精选、手Q京东购物）均可使用，优惠券分为全品类券和限品类券两种：全品类券可用于全部商品（在商品详情页标注不得使用东券的特殊商品及全球购商品除外），限品类券优惠券仅可购买对应分类下指定商品，当订单中所购商品总额满足对应优惠券使用限额才能使用；<br/>
                </p>
            </div>
        );
    }
}


class Tab extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedIndex : 1,
            friendData:[],
            participationData:[]
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.setState({selectedIndex:1});
        return true;
    }

    //组件状态更新时调用
    componentDidUpdate(prevProps, prevState) {

    }

    componentDidMount(){
        var self = this;
        /*
         * 获取首页显示的砍价信息
         * */
        DataStore.getFriendList({id:""}).then(function (responseObject) {
            console.info(responseObject);
            self.setState({
                friendData:responseObject
            });
        }, function (error) {
            console.info(error);
        });

        DataStore.getParticipationList({id:"",page:0}).then(function (responseObject) {
            console.info(responseObject);
            self.setState({
                participationData:responseObject
            });
        }, function (error) {
            console.info(error);
        });

    }

    render(){
        const self = this;
        const titles = ["助砍好友榜单","活动规则","参与榜"];
        return (
            <div className="row" id="tab">
                <div className="small-12 columns tab padding-clear">
                    <div className="row tab-bar padding-clear">
                        {titles.map(function(title,index){
                            const className = (index == self.state.selectedIndex) ? "active" : "";
                            const handleClickEventHandler = () => {
                                self.setState({selectedIndex:index});
                            }
                            const item = (
                                <div key={index} className="small-4 columns padding-clear" onClick={handleClickEventHandler}>
                                    <span className={className}>{title}</span>
                                </div>
                            );
                            return item;
                        })}
                    </div>
                    <div className="row tab-page padding-clear">
                        <TabPageTableView cells={this.state.friendData} index="0" selectedIndex={this.state.selectedIndex}/>
                        <TabPageRulePage index="1" selectedIndex={this.state.selectedIndex}/>
                        <TabPageTableView cells={this.state.participationData} index="2" selectedIndex={this.state.selectedIndex}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tab