/**
 * Created by itachi on 16/11/3.
 */

var Mock = require("mockjs");
var AppConfig = require("./../components/AppConfig.js");

// 配置请求的相应时间
Mock.setup({timeout: '1000-2000'});

/*
 * 管理人员登陆
 * @param username:String 用户名
 * @param password:String 密码 (MD5加密)
 * */
Mock.mock(AppConfig.ApiConfig.sysLogin, {
    'status': 0,
    'data': {
        id: '6db0-4c09-99bc-7d99afed961b' /*管理员用户ID*/
    }
});

/*
 * 登陆
 * 1:密码登陆时的参数
 * @param phone:String
 * @param password:String
 *
 * 2:验证码登陆时的参数
 * @param phone:String
 * @param code:String
 * */
Mock.mock(AppConfig.ApiConfig.login, {
    'status': 0,
    'data': {
        id: '72cf0b3c-6db0-4c09-99bc-7d99afed961b', /*用户Id*/
        nickname: '甜甜圈', /*用户昵称*/
        phone: '134****6543', /*手机号码*/
        email: '13476116543@163.com', /*邮箱*/
        birthday: '', /*生日*/
        provinceValues: [1, 1, 2], /*省市区值*/
        provinceLabel: "北京市北京市东城区",
        address: '光谷资本大厦', /*联系地址*/
        name: '', /*真实姓名*/
        IDNumber: '', /*身份证号*/
        password: 'afed961', /*md5格式,做自动登陆*/
        payPassword: '123456', /*md5格式,做自动登陆*/
        wx: 'w1915655273', /*微信号码*/
        imageUrl: 'http://img.boqiicdn.com/Data/BK/A/1311/25/img26701385362659_y.jpg', /*用户头像*/
        activityScore: 2000, /*活动积分*/
        numberScore: 3000, /*生命数字积分*/
        lifeScore: 3000, /*正念生活积分*/
        range: 128 /*积分排名*/
    }
});

/*
 * 根据手机获取验证码
 * @param phone:String
 * */
Mock.mock(AppConfig.ApiConfig.validatePhone, {
    'status': 0,
    'data': {
        code: '1234' /*验证码*/
    }
});

/*
 * 获取积分详情
 * @param id:String 用户ID
 * */
Mock.mock(AppConfig.ApiConfig.getIntegralDetail, {
    'status': 0,
    'data': [
        {
            "title": "捐款1000元",
            "score": 15,
            "date": '2016/11/08 08:30'
        }
    ]
});

/*
 * 修改微信
 * @param id:String 用户ID
 * @param wx:String 微信号码
 * */
Mock.mock(AppConfig.ApiConfig.modifyWx, {
    'status': 0
});

/*
 * 修改实名
 * @param id:String 用户ID
 * @param IDNumber:String 身份证号码
 * @param name:String 真实姓名
 * */
Mock.mock(AppConfig.ApiConfig.modifyIDNumber, {
    'status': 0
});

/*
 * 修改支付密码
 * @param id:String 用户ID
 * @param payPassword:String 支付密码 （MD5加密过）
 * */
Mock.mock(AppConfig.ApiConfig.modifyPayPassword, {
    'status': 0
});

/*
 * 修改生日
 * @param id:String 用户ID
 * @param birthday:String 生日 (格式为:yyyy-MM-dd)
 * */
Mock.mock(AppConfig.ApiConfig.modifyBirthday, {
    'status': 0
});

/*
 * 修改登陆密码
 * @param id:String 用户ID
 * @param password:String 登陆密码 MD5加密过）
 * */
Mock.mock(AppConfig.ApiConfig.modifyPassword, {
    'status': 0
});

/*
 * 修改地址
 * @param id:String 用户ID
 * @param address: String 详细地址
 * @param provinceValues:Array[3] 省市区值 例如[1,1,1]
 * @param provinceLabel:String 省市区字符串
 * */
Mock.mock(AppConfig.ApiConfig.modifyAddress, {
    'status': 0
});

/*
 * 修改邮箱
 * @param id:String 用户ID
 * @param email:String 用户邮箱
 * */
Mock.mock(AppConfig.ApiConfig.modifyEmail, {
    'status': 0
});

/*
 * 修改手机号
 * @param id:String 用户ID
 * @param phone:String 手机号码
 * */
Mock.mock(AppConfig.ApiConfig.modifyPhone, {
    'status': 0
});

/*
 * 修改昵称
 * @param id:String 用户ID
 * @param nickname:String 用户昵称
 * */
Mock.mock(AppConfig.ApiConfig.modifyNickname, {
    'status': 0
});

/*
 * 获取积分排名
 * @param pageIndex:Int 第几页 从1开始
 * @param pageSize:Int 每页多少条数据
 * */
Mock.mock(AppConfig.ApiConfig.getIntegralOrder, {
    'status': 0,
    'data': [
        {
            index: 1,
            imageUrl: 'http://tse1.mm.bing.net/th?id=OIP.M8b1c1fbeb0742c5e561d00e24b107593o0&pid=15.1',
            name: 'Zhu Zhenxiang',
            score: 12800
        },
        {
            index: 2,
            imageUrl: 'http://file.youboy.com/a/142/32/24/8/931358.jpg',
            name: 'Wan Dewu',
            score: 12600
        },
        {
            index: 3,
            imageUrl: 'http://www.cndog.net/tpb/2012-12/20/2012218-4592.jpg',
            name: 'Gao Xing',
            score: 12400
        },
        {
            index: 4,
            imageUrl: 'http://img4.goumin.com/attachments/photo/0/0/57/14829/3796245o2.jpg',
            name: 'Ren Jinlong',
            score: 12200
        },
        {
            index: 5,
            imageUrl: 'http://img.boqiicdn.com/Data/BK/A/1311/25/img26701385362659_y.jpg',
            name: 'Yin Pan',
            score: 12000
        },
        {
            index: 6,
            imageUrl: 'http://www.cndog.net/tpb/2012-12/20/2012218-4592.jpg',
            name: 'Gao Xing',
            score: 12400
        },
        {
            index: 7,
            imageUrl: 'http://img4.goumin.com/attachments/photo/0/0/57/14829/3796245o2.jpg',
            name: 'Ren Jinlong',
            score: 12200
        },
        {
            index: 8,
            imageUrl: 'http://www.cndog.net/tpb/2012-12/20/2012218-4592.jpg',
            name: 'Gao Xing',
            score: 12400
        },
        {
            index: 9,
            imageUrl: 'http://img4.goumin.com/attachments/photo/0/0/57/14829/3796245o2.jpg',
            name: 'Ren Jinlong',
            score: 12200
        }
    ]
});

/*
 * 获取我的活动
 * @param id:String 用户ID
 * */
Mock.mock(AppConfig.ApiConfig.getMyActivity, {
    'status': 0,
    'data': [
        {
            id: '1',
            title: '纪念逝去的杀马特',
            imageUrl: 'http://p8.qhimg.com/t019277942e2ab9709c.jpg',
            date: '2016/11/08 00:00:00',
            address: '张之洞路窑洞之王'
        },
        {
            id: '2',
            title: '活在我们心中的雷锋哥哥',
            imageUrl: 'http://p8.qhimg.com/t019277942e2ab9709c.jpg',
            date: '2016/11/08 00:00:00',
            address: '汉阳大道雾里吞'
        },
        {
            id: '3',
            title: '咱们屯里的人纪念发布会',
            imageUrl: 'http://p8.qhimg.com/t019277942e2ab9709c.jpg',
            date: '2016/11/08 00:00:00',
            address: '光谷大道中山公园'
        }
    ]
});
