/**
 * Created by itachi on 16/11/3.
 */

var Mock = require("mockjs");
var MockRandom = Mock.Random;
var AppConfig = require("./../components/AppConfig.js");

// 配置请求的相应时间
Mock.setup({timeout: '2000-3000'});


// 模拟活动页数据
Mock.mock(AppConfig.ApiConfig.getActivityInfo, {
    'status': 0,
    'data': {
        'openId': '@string',
        'title': '禅宗',
        "lng": 116.397428,
        "lat": 39.90923,
        'imageUrl': 'http://p8.qhimg.com/t019277942e2ab9709c.jpg',
        'subTitle': '成都养生协会国学交流论坛',
        'address': '成都市武侯区香格里拉酒店2楼',
        'date': '@datetime("yyyy/MM/dd HH:mm")',
        'desc': '这是一场分享如何平复自己心灵，学会静心养身的交流会。我们邀请了知名的国学大师：错红酒来为我们分享中国古文学中静气灵神的经验。学会静心养身的交流会。我们邀请了知名的国学大师：错红酒来为我们分享中国古文学中静气灵神的经验。学会静心养身的交流会。我们邀请了知名的国学大师：错红酒来为我们分享中国古文学中静气灵神的经验。学会静心养身的交流会。我们邀请了知名的国学大师：错红酒来为我们分享中国古文学中静气灵神的经验。'
    }
});

// 验证票据
Mock.mock(AppConfig.ApiConfig.validate, {
    'status|0-1': 1,
    'data': {}
});

// 模拟报名接口数据
// Mock.mock(AppConfig.ApiConfig.getEdit, {
//     "status": 0,
//     "data": [{
//         "id": 1,
//         "title": "性别",
//         "type": "select",
//         "options": [
//             {"label": "男", "value": "11"},
//             {"label": "女", "value": "12"},
//             {
//                 "label": "是",
//                 "value": "51"
//             },
//             {"label": "否", "value": "52"}]
//     },
//         {"id": 2, "title": "微信号", "type": "text"},
//         {"id": 3, "title": "所在省市", "type": "text"},
//         {
//             "id": 4,
//             "title": "您是否患有以下疾病",
//             "type": "checkbox",
//             "options": [{"label": "高血压", "value": "41"}, {"label": "心脏病", "value": "42"}]
//         },
//         {"id": 5, "title": "您是否参加过喜悦的任何活动", "type": "radiobox", "options": []}],
//     "message": "ok"
// });
Mock.mock(AppConfig.ApiConfig.getEdit, {
    "status": "0",
    "data": [{
        "id": "sex",
        "title": "性别",
        "type": "select",
        "options": [{"label": "男", "value": "11"}, {"label": "女", "value": "12"}]
    }, {"id": "wechatId", "title": "微信号", "type": "text"}, {
        "id": "company",
        "title": "工作单位",
        "type": "text"
    }, {"id": "job", "title": "职位", "type": "text"},
        {
            "id": "educational",
            "title": "学历",
            "type": "select", "initialValue": ["aoxl2"],
            "options": [{"label": "高中", "value": "aoxl1"}, {"label": "本科", "value": "aoxl2"}, {
                "label": "硕士",
                "value": "aoxl3"
            }, {"label": "博士", "value": "aoxl4"}]
        }, {
            "id": "3",
            "title": "所在省市",
            "type": "select",
            "options": [{"label": "北京市", "value": "3101"}, {"label": "浙江省", "value": "3111"}, {
                "label": "湖北省",
                "value": "3117"
            }]
        }, {
            "id": "4",
            "title": "您是否患有以下疾病",
            "type": "checkbox",
            "options": [{"label": "高血压", "value": "41"}, {"label": "心脏病", "value": "42"}, {
                "label": "肾脏疾病",
                "value": "43"
            }, {"label": "哮喘", "value": "44"}, {"label": "糖尿病", "value": "45"}, {
                "label": "癌症",
                "value": "46"
            }, {"label": "风湿性、类风湿性疾病", "value": "47"}, {"label": "无以上疾病", "value": "48"}]
        }, {
            "id": "5",
            "title": "您是否参加过喜悦的任何活动",
            "type": "radiobox",
            "options": [{"label": "是", "value": "51"}, {"label": "否", "value": "52"}]
        }],
    "message": "ok"
});

/*
 * 模拟参加活动接口，返回密钥
 * */
Mock.mock(AppConfig.ApiConfig.checkin, {
    'status': 0,
    'data': {
        qrCode: '@string',
        uid: "@string",
        isExt: 1,
        shortUrl:"http://t.cn/Rf9Rb0I"
    }
});

//// 模拟首页请求数据
//Mock.mock(AppConfig.ApiConfig.getBarginInfo,{
//    'status':1,
//    'data':{
//        'openId': '@string',
//        'isMine|0-1': 1,
//        'isFirst|0-1': 1,
//        'money':MockRandom.integer(30000,40000),
//        'price':MockRandom.integer(100000,500000),
//        'originalPrice':MockRandom.integer(500000,600000),
//        'name|1':['奥迪A7','奔驰','雪铁龙'],
//        'url':'',
//        'deadline|1':['2016/11/08 00:00:00','2016/11/09 00:00:00','2016/11/10 00:00:00']
//    }
//});
//
///*
//* 模拟好友请求数据
//* */
//Mock.mock(AppConfig.ApiConfig.getFriendList,{
//    "status":1,
//    "data|1-10":[
//        {
//            "text|1":[
//                "不忘初心，人胖多砍价，人笨多砍价，一口气砍掉<span>800</span>元",
//                "小溪，说待我长发及腰时再砍，帮你砍掉<span>800</span>元",
//                "Uchiha Itachi,你问我爱你有多深，砍价代表我的心，帮你砍掉<span>800</span>元",
//                "snail,帮你砍掉<span>34.27</span>元,我和我的小伙伴都惊呆了！",
//                "Mars，说专治各种砍价，不服来砍，帮你砍掉<span>35.02</span>元!"
//            ],
//            "imageUrl":MockRandom.dataImage('80x80')
//        }
//    ]
//});
//
///*
//* 模拟参与榜请求数据
//* */
//Mock.mock(AppConfig.ApiConfig.getParticipationList,{
//    "status":1,
//    "data|1-10":[
//        {
//            "text|1":[
//                "不忘初心，已砍掉800元,<span>当前金额23216</span>元",
//                "乔峰，已砍掉1800元,<span>当前金额50034</span>元",
//                "慕容复，已砍掉8000元,<span>当前金额50034</span>元",
//                "傅家坡杜兰特，已砍掉4760元,<span>当前金额34355</span>元",
//                "花山科比，已砍掉2390元,<span>当前金额3556</span>元",
//                "江夏詹姆斯，已砍掉100元,<span>当前金额56563</span>元",
//            ],
//            "imageUrl":MockRandom.image('80x80')
//        }
//    ]
//});

