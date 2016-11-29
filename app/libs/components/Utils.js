/**
 * Created by itachi on 16/11/5.
 */
import {Toast} from 'antd-mobile';

module.exports = {
    MessageBox:{
        show:function(content){
            Toast.info(content,1.2);
        }
    }
};