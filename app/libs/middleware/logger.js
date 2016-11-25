
const logger = ({ dispatch, getState }) => next => action => {
  console.log('dispatching', action.type)
  let result = next(action)
  console.log('next state', getState())
  return result
}

export default logger;