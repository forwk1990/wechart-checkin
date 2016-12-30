/**
 * Created by itachi on 16/11/5.
 */
import {Toast} from 'antd-mobile';

module.exports = {
    MessageBox: {
        show: function (content) {
            Toast.info(content, 1.2);
        }
    },
    Validator: {
        isRegularID: function (id) {
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(id)
        },
        isRegularPhone: function (phone) {
            return /^1[34578]\d{9}$/.test(phone)
        },
        isRegularEmail: function (email) {
            return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(email)
        }
    },
    Formatter: {
        /*
         * 加密手机号
         * */
        encryptionPhone: function (phone) {
            if (!phone)return "";
            if (!phone.length && phone.length !== 11)return "";
            return phone.substring(0, 3) + "****" + phone.substring(7);
        }
    },
    Vip: {
        getNameFromLevel(level){
            if (level == 2)return "高级会员";
            if (level == 3)return "堂主";
            return "普通会员";
        }
    },
    WxManager: {
        authorizePage(url){
            return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe9fd9c3c9fd68bc7&redirect_uri=${encodeURI(url)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
        },
        isWx(){
            console.log("navigator.userAgent:",navigator.userAgent)
            return navigator.userAgent.match(/MicroMessenger/i) === 'MicroMessenger'
        },
        shareAll(title, desc, link, imageUrl){
            var shareData = {
                title: title,
                desc: desc,
                link: link,
                imgUrl: imageUrl
            };
            wx.onMenuShareAppMessage(shareData);
            wx.onMenuShareTimeline(shareData);
            wx.onMenuShareQQ(shareData);
            wx.onMenuShareQZone(shareData);
            wx.onMenuShareWeibo(shareData);
        },
        shareAllWithOption(option){
            const link = option.link || window.location.href
            const imgUrl = option.imgUrl || require('喜宝100')
            this.shareAll(option.title, option.desc, link, imgUrl)
        },
        offlineShareOptions(){
            return {
                title: "线下活动",
                desc: "喜悦活动列表"
            }
        },
        exerciseShareOptions(){
            return {
                title: "正念训练",
                desc: "正念训练列表"
            }
        },
        lifeNumberShareOptions(){
            return {
                title: "生命数字",
                desc: "心的喜悦生命数字真是太灵验了，大家快来算一算自己的运势吧"
            }
        },
        archiveShareOptions(){
            return {
                title: "我的喜悦",
                desc: "我的喜悦个人资料"
            }
        },
        integralOrderShareOptions(){
            return {
                title: "我的排名",
                desc: "我的排名又增加啦"
            }
        }
    },
    ColorManager: {
        _springColor(){
            return "#69B26B";
        },
        _summerColor(){
            return "#5DBBE9";
        },
        _autumnColor(){
            return "#FAB631"
        },
        _winterColor(){
            return "#A16BCA"
        },
        currentSeasonInfo(date){
            const month = new Date(Date.parse(date)).getMonth() + 1;
            if (month >= 1 && month <= 3) {
                return {color: this._springColor(), imageUrl: require('喜宝绿色底')}
            } else if (month > 3 && month < 7) {
                return {color: this._summerColor(), imageUrl: require('喜宝蓝色底')}
            } else if (month >= 7 && month <= 9) {
                return {color: this._autumnColor(), imageUrl: require('喜宝橙色底')}
            } else {
                return {color: this._winterColor(), imageUrl: require('喜宝紫色底')};
            }
        }
    }
};


/**
 * 使用正则表达式校验电子邮箱
 * @param    string    str    要校验的字符串
 * @return    bool
 function isEmail(str) {
    return /^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(str);
}

 /!**
 * 使用正则表达式校验手机号
 * @param    string    str    要校验的字符串
 * @return    bool
 *!/
 function isMobile(str) {
    return /^0?(13|14|15|17|18)[0-9]{9}$/.test(str);
}

 /!**
 * 使用正则表达式校验电话号
 * @param    string    str    要校验的字符串
 * @return    bool
 *!/
 function isTel(str) {
    return /^[0-9-()\+]{7,18}$/.test(str);
}

 /!**
 * 使用正则表达式校验网址
 * @param    string    str    要校验的字符串
 * @return    bool
 *!/
 function isUrl(str) {
    return /^[a-zA-Z]+:\/\/[^\s]+$/.test(str);
}

 /!**
 * 使用正则表达式校验日期
 * @param    string    str    要校验的字符串
 * @return    bool
 *!/
 function isDate(str) {
    return /^\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}$/.test(str);
}

 /!**
 * 使用正则表达式校验时间
 * @param    string    str    要校验的字符串
 * @return    bool
 *!/
 function isDatetime(str) {
    return /^\d{4}(\-|\/|.)\d{1,2}\1\d{1,2} \d{1,2}:\d{1,2}$/.test(str);
}

 /!**
 * 使用正则表达式校验中文
 * @param    string    str    要校验的字符串
 * @return    bool
 *!/
 function isZh(str) {
    return /^[\u4E00-\u9FA5\s]+$/.test(str);
}

 /!**
 * 使用正则表达式校验用户名
 * @param    string    str    要校验的字符串
 * @return    bool
 *!/
 function isUsername(str) {
    return /^[A-Za-z0-9_\-\u4E00-\u9FA5\s]+$/.test(str);
}

 /!**
 * 使用正则表达式校验真实姓名
 * @param    string    str    要校验的字符串
 * @return    bool
 *!/
 function isRealname(str) {
    return /^[A-Za-z\u4E00-\u9FA5\s]+$/.test(str);
}

 /!**
 * 使用正则表达式校验中国邮编
 * @param    string    str    要校验的字符串
 * @return    bool
 *!/
 function isZipcode(str) {
    return /^[1-9]\d{5}$/.test(str);
}

 /!**
 * 使用正则表达式校验中国身份证
 * @param    string    str    要校验的字符串
 * @return    bool
 *!/
 function isIdcard(str) {
    return /(^\d{17}[\d|x|X]$)|(^\d{15}$)/.test(str);
}

 /!**
 * 使用正则表达式校验IP地址
 * @param    string    str    要校验的字符串
 * @return    bool
 *!/
 function isIp(str) {
    return /^((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))$/.test(str);
}

 /!**
 * 使用正则表达式校验数字
 * @param    string    str    要校验的字符串
 * @return    bool
 *!/
 function isDecimal(str) {
    return /^([+-]?)\d*\.?\d+$/.test(str);
}*/

