/**
 * Created by itachi on 16/11/3.
 */

var Mock = require("mockjs");
var MockRandom = Mock.Random;
var AppConfig = require("./../components/AppConfig.js");

// 配置请求的相应时间
Mock.setup({timeout:'2000-3000'});

// 模拟首页请求数据
Mock.mock(AppConfig.ApiConfig.getBarginInfo,{
    'status':1,
    'data':{
        'openId': '@string',
        'isMine|0-1': 1,
        'isFirst|0-1': 1,
        'money':MockRandom.integer(30000,40000),
        'price':MockRandom.integer(100000,500000),
        'originalPrice':MockRandom.integer(500000,600000),
        'name|1':['奥迪A7','奔驰','雪铁龙'],
        'url':'',
        'deadline|1':['2016/11/08 00:00:00','2016/11/09 00:00:00','2016/11/10 00:00:00']
    }
});

/*
* 模拟好友请求数据
* */
Mock.mock(AppConfig.ApiConfig.getFriendList,{
    "status":1,
    "data|1-10":[
        {
            "text|1":[
                "不忘初心，人胖多砍价，人笨多砍价，一口气砍掉<span>800</span>元",
                "小溪，说待我长发及腰时再砍，帮你砍掉<span>800</span>元",
                "Uchiha Itachi,你问我爱你有多深，砍价代表我的心，帮你砍掉<span>800</span>元",
                "snail,帮你砍掉<span>34.27</span>元,我和我的小伙伴都惊呆了！",
                "Mars，说专治各种砍价，不服来砍，帮你砍掉<span>35.02</span>元!"
            ],
            "imageUrl":MockRandom.dataImage('80x80')
        }
    ]
});

/*
* 模拟参与榜请求数据
* */
Mock.mock(AppConfig.ApiConfig.getParticipationList,{
    "status":1,
    "data|1-10":[
        {
            "text|1":[
                "不忘初心，已砍掉800元,<span>当前金额23216</span>元",
                "乔峰，已砍掉1800元,<span>当前金额50034</span>元",
                "慕容复，已砍掉8000元,<span>当前金额50034</span>元",
                "傅家坡杜兰特，已砍掉4760元,<span>当前金额34355</span>元",
                "花山科比，已砍掉2390元,<span>当前金额3556</span>元",
                "江夏詹姆斯，已砍掉100元,<span>当前金额56563</span>元",
            ],
            "imageUrl":MockRandom.image('80x80')
        }
    ]
});

