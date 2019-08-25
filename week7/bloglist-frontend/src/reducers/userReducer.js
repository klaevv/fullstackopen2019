const initialState = {
  user: null
}

export const setUser = (user) => {
  return dispatch => dispatch({
    type: 'SET_USER',
    user
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USER':
    return {
      user: action.user
    }
  default:
    return state
  }
}

export default reducer
