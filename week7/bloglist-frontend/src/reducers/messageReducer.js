const initialState = {
  message: '',
  error: ''
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

export const setError = (error, seconds) => {
  const delay = seconds * 1000
  return async dispatch => {
    dispatch({
      type: 'NEW_ERROR',
      error
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, delay)
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    return {
      ...state,
      message: action.message
    }
  case 'NEW_ERROR':
    return {
      ...state,
      error: action.error
    }
  case 'RESET':
    return initialState
  default:
    return state
  }
}

export default reducer
