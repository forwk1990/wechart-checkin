/**
 * Created by itachi on 16/11/9.
 */

import ActionTypes from 'constants/ActionTypes';
import {combineReducers} from 'redux';

const initialState = {
    'isReady': false,
    'title': '',
    'imageUrl': '',
    'subTitle': '',
    'address': '',
    'date': '',
    'desc': '',
    'activityId': ''
};

function getActivityReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.getActivityBefore: {
            return Object.assign({}, state, {
                isReady: false
            });
        }
        case ActionTypes.getActivity: {
            return Object.assign({}, state, action.responseObject);
        }
        case ActionTypes.getActivityAfter: {
            return Object.assign({}, state, {
                isReady: true
            });
        }
        default:
            return state;
    }
}

function checkInReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.checkInBefore: {
            return Object.assign({}, state, {
                loading: true
            });
        }
        case ActionTypes.checkIn: {
            return Object.assign({}, state, action.responseObject);
        }
        case ActionTypes.checkInAfter: {
            return Object.assign({}, state, {
                loading: false,
                phone: action.phone
            });
        }
        default:
            return state;
    }
}

function explainReducer(state = {}, action) {
    switch (action.type) {
        case ActionTypes.getExplain: {
            return Object.assign({}, state, {data: action.responseObject});
        }
        default:
            return state;
    }
}

/*
* 管理员帐户信息
* */
function managerReducer(state = {}, action) {
    switch (action.type){
        case ActionTypes.managerLogin: {
            return Object.assign({}, state, action.responseObject);
        }
        default:
            return state;
    }
}

const userInfoDefaultState = {
    id: '', /*用户Id*/
    nickname: '', /*用户昵称*/
    phone: '', /*手机号码*/
    email: '', /*邮箱*/
    birthday: '', /*生日*/
    provinceValues: [], /*省市区值*/
    provinceLabel: "",
    address: '', /*联系地址*/
    name: '', /*真实姓名*/
    IDNumber: '', /*身份证号*/
    password: '', /*md5格式,做自动登陆*/
    payPassword: '', /*md5格式,做自动登陆*/
    wx: '', /*微信号码*/
    imageUrl: '', /*用户头像*/
    activityScore: 0, /*活动积分*/
    numberScore: 0, /*生命数字积分*/
    lifeScore: 0, /*正念生活积分*/
    totalScore: 0, /*总分*/
    range: 0 /*积分排名*/
}

/*
 * 用户信息
 * */
function userInfoReducer(state = userInfoDefaultState, action) {
    switch (action.type) {
        case ActionTypes.modifyImageUrl:
        case ActionTypes.login: {
            return Object.assign({}, state, action.responseObject);
        }
        case ActionTypes.modifyNickname: {
            return Object.assign({}, state, {nickname: action.nickname});
        }
        case ActionTypes.modifyEmail: {
            return Object.assign({}, state, {email: action.email});
        }
        case ActionTypes.modifyAddress: {
            return Object.assign({}, state, {address: action.address, provinceValues: action.provinceValues, provinceLabel: action.provinceLabel});
        }
        case ActionTypes.modifyPhone: {
            return Object.assign({}, state, {phone: action.phone});
        }
        case ActionTypes.modifyWx: {
            return Object.assign({}, state, {wx: action.wx});
        }
        case ActionTypes.modifyBirthday: {
            return Object.assign({}, state, {birthday: action.birthday});
        }
        case ActionTypes.modifyIDNumber: {
            return Object.assign({}, state, {IDNumber: action.IDNumber, name: action.name});
        }
        case ActionTypes.modifyPassword: {
            return Object.assign({}, state, {password: action.password});
        }
        case ActionTypes.modifyPayPassword: {
            return Object.assign({}, state, {payPassword: action.payPassword});
        }
        case ActionTypes.clearUser:{
            return {};
        }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    getActivityReducer,
    managerReducer,
    checkInReducer,
    explainReducer,
    userInfoReducer
});

export default rootReducer;