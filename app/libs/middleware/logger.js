const logger = ({dispatch, getState}) => next => action => {
    console.log('dispatching', action.type);
    console.info(typeof next);
    let result = next(action);
    console.log("dispatch success,getState is type of ",typeof getState);
    console.log('next state', getState());
    return result;
}

export default logger;