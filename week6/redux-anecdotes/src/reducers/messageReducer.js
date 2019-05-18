const initialState = {
  message: ''
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_NOTE':
      return {
        message: `new anecdote ${action.id} created`
      }
    default:
      return state
  }
}

export default reducer
