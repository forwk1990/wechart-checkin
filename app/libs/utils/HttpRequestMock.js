/**
 * Created by itachi on 16/11/3.
 */

var Mock = require("mockjs");
var MockRandom = Mock.Random;
var AppConfig = require("./../components/AppConfig.js");

// 配置请求的相应时间
Mock.setup({timeout:'2000-3000'});


// 模拟活动页数据
Mock.mock(AppConfig.ApiConfig.getActivityInfo,{
    'status':1,
    'data':{
        'openId':'@string',
        'username':'@string',
        'imageUrl':MockRandom.image('100x100','#ff0000'),
        'activityName':'成都养生协会国学交流论坛',
        'address':'成都市武侯区香格里拉酒店2楼',
        'date':'@datetime("yyyy/MM/dd HH:mm")',
        'desc':'这是一场分享如何平复自己心灵，学会静心养身的交流会。我们邀请了知名的国学大师：错红酒来为我们分享中国古文学中静气灵神的经验。'
    }
});

// 模拟报名接口数据
Mock.mock(AppConfig.ApiConfig.getEdit,{
    'status':1,
    'data':[
        {
            "title":"性别",
            "type":"select",
            "options":[
                {
                    "label":"男",
                    "value":"11" // 对应唯一标志
                },
                {
                    "label":"女",
                    "value":"22" // 对应唯一标志
                }
            ]
        },
        {
            "title":"微信号",
            "type":"text",
            "options":[]
        },
        {
            "title":"工作单位",
            "type":"text"
        },
        {
            "title":"职位",
            "type":"text"
        },
        {
            "title":"学历",
            "type":"select",
            "options":[
                {
                    "label":"高中",
                    "value":"10" // 对应唯一标志
                },
                {
                    "label":"本科",
                    "value":"20" // 对应唯一标志
                },
                {
                    "label":"硕士",
                    "value":"30" // 对应唯一标志
                },
                {
                    "label":"博士",
                    "value":"40" // 对应唯一标志
                }
            ]
        },
        {
            "title":"您是否患有以下疾病",
            "type":"checkbox",
            "options":[
                {
                    "label":"高血压",
                    "value":"1" // 对应唯一标志
                },
                {
                    "label":"心脏病",
                    "value":"2" // 对应唯一标志
                },
                {
                    "label":"肾脏疾病",
                    "value":"3" // 对应唯一标志
                },
                {
                    "label":"哮喘",
                    "value":"4" // 对应唯一标志
                },
                {
                    "label":"糖尿病",
                    "value":"5" // 对应唯一标志
                },
                {
                    "label":"癌症",
                    "value":"6" // 对应唯一标志
                },
                {
                    "label":"风湿性、类风湿性疾病",
                    "value":"7" // 对应唯一标志
                },
                {
                    "label":"无以上疾病",
                    "value":"8" // 对应唯一标志
                }
            ]
        },
        {
            "title":"您是否曾今参加过茶道课程",
            "type":"radiobox",
            "options":[
                {
                    "label":"是",
                    "value":"1"
                },
                {
                    "label":"否",
                    "value":"0"
                }
            ]
        },
        {
            "title":"您是否参加过喜悦的任何活动",
            "type":"radiobox",
            "options":[
                {
                    "label":"是",
                    "value":"b0"
                },
                {
                    "label":"否",
                    "value":"b1"
                }
            ]
        }
    ]
});

/*
* 模拟参加活动接口，返回密钥
* */
Mock.mock(AppConfig.ApiConfig.checkin,{
    'status':1,
    'data':{
        key:'@string'
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

