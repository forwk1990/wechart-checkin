/**
 * Created by itachi on 16/11/3.
 */

const domain = "http://www.joyiou.com/";
const serverUrl = "services/";

function _getFullUrlFromRelative(category,relativeUrl){
    return domain + serverUrl + category + "/" + relativeUrl;
}

var Config =  {
    /*
    * 接口配置
    * */
    ApiConfig:{
        /*
        * 获取活动信息
        * */
        getActivityInfo:_getFullUrlFromRelative("CheckInServer","getActivity"),
        /*
        * 报名接口
        * */
        checkin:_getFullUrlFromRelative("CheckInServer","postEnroll"),
        /*
        * 获取编辑数据接口
        * */
        getEdit:_getFullUrlFromRelative("CheckInServer","getUserInfoTableExt"),
        /*
        * 验证票据
        * */
        validate:_getFullUrlFromRelative("CheckInServer","checkTicket"),
        /*
        * 算命
        * */
        getExplain:_getFullUrlFromRelative("CheckInServer","getNumerologyByBirthday"),
        /**
         * 完善资料
         * */
        fill:_getFullUrlFromRelative("CheckInServer","putUserInfoExt"),

        /*
        * 喜悦生活
        * */
        getLife:_getFullUrlFromRelative("CheckInServer","getJoyLifeByType"),

        /*
        * 获取喜悦活动
        * */
        getAllActivity:_getFullUrlFromRelative("CheckInServer","getActivityList"),

        /*
        * 获取我的活动
        * */
        getMyActivity:_getFullUrlFromRelative("UserServer","getActivity"),

        /*
        * 获取积分排名
        * */
        getIntegralOrder:_getFullUrlFromRelative("UserServer","getIntegralOrder"),

        /*
        * 获取积分详情
        * */
        getIntegralDetail:_getFullUrlFromRelative("IntegralServer","getIntegralDetail"),

        /*
        * 验证手机
        * */
        validatePhone:_getFullUrlFromRelative("UserServer","validatePhone"),

        /*
        * 获取验证码
        * */
        getVerifyCode:_getFullUrlFromRelative("UserServer","getVerifyCode"),

        /*
        * 活动完成
        * */
        notifyComplete:_getFullUrlFromRelative("CheckInServer","notifyComplete"),

        /*
        * 系统管理人员登陆
        * */
        managerLogin:_getFullUrlFromRelative("UserServer","managerLogin"),

        /*
        * 登陆
        * */
        login:_getFullUrlFromRelative("UserServer","login"),

        /*
        * 配置微信
        * */
        wxConfig:"http://www.joyiou.com/wxpt/wxConfig.jsp",

        /*
        * 修改昵称
        * */
        modifyNickname:_getFullUrlFromRelative("UserServer","modifyNickname"),

        /*
        * 修改手机号
        * */
        modifyPhone:_getFullUrlFromRelative("UserServer","modifyPhone"),

        /*
         * 修改邮箱
         * */
        modifyEmail:_getFullUrlFromRelative("UserServer","modifyEmail"),

        /*
         * 修改微信号
         * */
        modifyWx:_getFullUrlFromRelative("UserServer","modifyWx"),

        /*
        * 修改头像
        * */
        modifyImageUrl:_getFullUrlFromRelative("UserServer","modifyImageUrl"),

        /*
         * 修改出生日期
         * */
        modifyBirthday:_getFullUrlFromRelative("UserServer","modifyBirthday"),

        /*
         * 修改地址
         * */
        modifyAddress:_getFullUrlFromRelative("UserServer","modifyAddress"),

        /*
         * 修改密码
         * */
        modifyPassword:_getFullUrlFromRelative("UserServer","modifyPassword"),

        /*
         * 修改支付密码
         * */
        modifyPayPassword:_getFullUrlFromRelative("UserServer","modifyPayPassword"),

        /*
         * 修改身份证号
         * */
        modifyIDNumber:_getFullUrlFromRelative("UserServer","modifyIDNumber"),

        /*
        * 获取省市区
        * */
        getProvince:_getFullUrlFromRelative("CheckInServer","getProvince")
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