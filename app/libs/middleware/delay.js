/**
 * Created by itachi on 16/11/9.
 */


const delay = ({dispatch,getState}) => next => action => {

    console.info("delay begin");

    if(!action.meta || !action.meta.delay){

        let result =  next(action);
        console.info('delay end');
        return result;
    }
    const timeoutId = setTimeout(function(){
        next(action);
        //clearTimeout(timeout);
    },action.meta.delay);

    //console.info('delay end');

    return function cancel() {
        clearTimeout(timeoutId)
    }



}

export default delay;