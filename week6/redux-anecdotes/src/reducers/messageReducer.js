const initialState = {
  message: ''
}

export const setNotification = (message, seconds) => {
  const delay = seconds * 1000
  return async dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      message
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, delay)
  }
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return {
        message: action.message
      }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export default reducer
