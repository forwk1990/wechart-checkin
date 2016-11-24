/**
 * Created by itachi on 16/11/3.
 */

const domain = "http://www.ldted.com/";
const serverUrl = "services/CheckInServer/";

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
        getActivityInfo:_getFullUrlFromRelative("getActivity"),
        /*
        * 报名接口
        * */
        checkin:_getFullUrlFromRelative("postEnroll"),
        /*
        * 获取编辑数据接口
        * */
        getEdit:_getFullUrlFromRelative("getEdit"),
    },
    /*
    * 百度地图API密钥
    * */
    ApiKey:"LyFtOF4ECbCVVMF2AUDa6ifLFe0ib1G6",
    /*
    * 百度地图Secret密钥
    * */
    SecretKey:"nRPymyj4BjWV64QAZyXhqQKCpdObk8Gm"
};

module.exports = Config;