/**
 * Created by itachi on 16/11/5.
 */
import {Toast} from 'antd-mobile';

module.exports = {
    MessageBox:{
        show:function(content){
            Toast.info(content,1.2);
        }
    },
    Validator:{
        isRegularID:function(id){
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(id)
        },
        isRegularPhone:function(phone){
            return /^1[34578]\d{9}$/.test(phone)
        },
        isRegularEmail:function(email){
            return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(email)
        }
    },
    Formatter:{
        /*
        * 加密手机号
        * */
        encryptionPhone:function(phone){
            if(!phone)return "";
            if(!phone.length && phone.length !== 11)return "";
            return phone.substring(0,3) + "****" + phone.substring(7);
        }
    }
};