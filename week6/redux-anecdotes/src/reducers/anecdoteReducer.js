import AnecdoteService from "../services/AnecdoteService"

export const newVote = (anecdote) => {
  return async dispatch => {
    const voted = await AnecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      id: voted.id
    })
  }
}

export const newNote = (content) => {
  return async dispatch => {
    const newAnecdote = await AnecdoteService.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      data: {
        content: newAnecdote.content,
        votes: 0,
        id: newAnecdote.id
      }
    })
  }
}

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await AnecdoteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: notes,
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const id = action.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        votes: noteToChange.votes + 1
      }
      return state.map(note =>
        note.id !== id ? note : changedNote
      )
    case 'NEW_NOTE':
      return state.concat(action.data)
    case 'INIT_NOTES':
      return action.data
    default:
      return state
  }
}

export default reducer
