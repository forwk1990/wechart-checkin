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
 * 用户信息
 * */
function userInfoReducer(state = {}, action) {
    switch (action.type) {
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
            return Object.assign({}, state, {address: action.address});
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
            return Object.assign({}, state, {isSetPayPassword: action.isSetPayPassword});
        }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    getActivityReducer,
    checkInReducer,
    explainReducer,
    userInfoReducer
});

export default rootReducer;