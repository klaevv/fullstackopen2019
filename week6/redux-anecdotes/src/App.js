import React from 'react'
import {
  newNote,
  newVote
} from './reducers/anecdoteReducer'

const App = ({ store }) => {
  const anecdotes = store.getState()

  const vote = (id) => {
    store.dispatch(newVote(id))
  }

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    store.dispatch(newNote(content))
    event.target.note.value = ''
  }

  const sorted = anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {sorted.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
