/**
 * Created by itachi on 16/11/9.
 */

import * as Actions from '../constants/ActionTypes.js'

import {combineReducers} from 'redux';

function rootReducer(state={isConfirmDisplay:false,isProgress:false},action){

    if(action.type == '@@redux/INIT'){
        return {isProgress:false,isConfirmDisplay:false};
    }
    console.info("进来了" + action.type);

    if(action.type == 'xxx'){
        return {isProgress:true,isConfirmDisplay:true};
    }

}

//const rootReducer = combineReducers({
//    _rootReducer
//});

export default rootReducer;