const initialState = {
  loggedUser: null,
  users: []
}

export const setLoggedUser = (loggedUser) => {
  return dispatch => dispatch({
    type: 'SET_LOGGED_USER',
    loggedUser
  })
}

export const setUsers = (users) => {
  return dispatch => dispatch({
    type: 'SET_USERS',
    users
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_LOGGED_USER':
    return {
      ...state,
      loggedUser: action.loggedUser
    }
  case 'SET_USERS':
    return {
      ...state,
      users: action.users
    }
  default:
    return state
  }
}

export default reducer
