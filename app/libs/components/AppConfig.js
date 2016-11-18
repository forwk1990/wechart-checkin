/**
 * Created by itachi on 16/11/3.
 */

const domain = "http://www.ldted.com/";
const serverUrl = "wechat/services/checkinserver/";

function _getFullUrlFromRelative(relativeUrl){
    return domain + serverUrl + relativeUrl;
}

var Config =  {
    /*
    * 接口配置
    * */
    ApiConfig:{
        /*
        * 获取活动信息
        * */
        getActivityInfo:_getFullUrlFromRelative("getActivityInfo"),
        /*
        * 报名接口
        * */
        checkin:_getFullUrlFromRelative("checkin"),
        /*
        * 获取编辑数据接口
        * */
        getEdit:_getFullUrlFromRelative("getEdit"),

    }
};

module.exports = Config;