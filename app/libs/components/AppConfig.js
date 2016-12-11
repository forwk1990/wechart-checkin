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
        getEdit:_getFullUrlFromRelative("getUserInfoTableExt"),
        /*
        * 验证票据
        * */
        validate:_getFullUrlFromRelative("checkTicket"),
        /*
        * 算命
        * */
        getExplain:_getFullUrlFromRelative("getNumerologyByBirthday"),
        /**
         * 完善资料
         * */
        fill:_getFullUrlFromRelative("putUserInfoExt"),

        /*
        * 喜悦生活
        * */
        getLife:_getFullUrlFromRelative("getJoyLifeByType"),

        /*
        * 获取我的活动
        * */
        getMyActivity:_getFullUrlFromRelative("getMyActivity"),

        /*
        * 获取积分排名
        * */
        getIntegralOrder:_getFullUrlFromRelative("getIntegralOrder"),

        /*
        * 获取积分详情
        * */
        getIntegralDetail:_getFullUrlFromRelative("getIntegralDetail"),

        /*
        * 验证手机
        * */
        validatePhone:_getFullUrlFromRelative("validatePhone"),

        /*
        * 登陆
        * */
        login:_getFullUrlFromRelative("login"),

        /*
        * 配置微信
        * */
        wxConfig:"http://www.ldted.com/wxpt/wxConfig.jsp",

        /*
        * 修改昵称
        * */
        modifyNickname:_getFullUrlFromRelative("modifyNickname"),

        /*
        * 修改手机号
        * */
        modifyPhone:_getFullUrlFromRelative("modifyPhone"),

        /*
         * 修改邮箱
         * */
        modifyEmail:_getFullUrlFromRelative("modifyEmail"),

        /*
         * 修改微信号
         * */
        modifyWx:_getFullUrlFromRelative("modifyWx"),

        /*
         * 修改出生日期
         * */
        modifyBirthday:_getFullUrlFromRelative("modifyBirthday"),

        /*
         * 修改地址
         * */
        modifyAddress:_getFullUrlFromRelative("modifyAddress"),

        /*
         * 修改密码
         * */
        modifyPassword:_getFullUrlFromRelative("modifyPassword"),

        /*
         * 修改支付密码
         * */
        modifyPayPassword:_getFullUrlFromRelative("modifyPayPassword"),

        /*
         * 修改身份证号
         * */
        modifyIDNumber:_getFullUrlFromRelative("modifyIDNumber"),

        /*
        * 获取省市区
        * */
        getProvince:_getFullUrlFromRelative("getProvince")
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