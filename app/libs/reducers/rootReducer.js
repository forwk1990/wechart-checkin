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
            return Object.assign({},state,action.responseObject);
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

function checkInReducer(state = initialState,action){
    switch (action.type) {
        case ActionTypes.checkInBefore: {
            return Object.assign({}, state, {
                loading: true
            });
        }
        case ActionTypes.checkIn: {
            return Object.assign({},state,action.responseObject);
        }
        case ActionTypes.checkInAfter: {
            return Object.assign({}, state, {
                loading: false,
                phone:action.phone
            });
        }
        default:
            return state;
    }
}

function explainReducer(state = {},action){
    switch(action.type){
        case ActionTypes.getExplain: {
            return Object.assign({}, state, {data:action.responseObject});
        }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    getActivityReducer,
    checkInReducer,
    explainReducer
});

export default rootReducer;