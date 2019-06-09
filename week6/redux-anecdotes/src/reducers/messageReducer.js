const initialState = {
  message: ''
}

export const reset = () => {
  return {
    type: 'RESET'
  }
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_NOTE':
      return {
        message: `new anecdote ${action.data.content} created`
      }
    case 'VOTE':
        return {
          message: `you voted ${action.id}`
        }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export default reducer
