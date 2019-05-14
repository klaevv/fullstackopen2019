import React from 'react'

const App = ({ store }) => {
  const anecdotes = store.getState()

  const vote = (id) => {
    store.dispatch({
      type: 'VOTE',
      id
    })
  }

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    store.dispatch({
      type: 'NEW_NOTE',
      data: {
        content,
        id: getId(),
        votes: 0
      }
    })
    event.target.note.value = ''
  }

  const getId = () => (100000 * Math.random()).toFixed(0)

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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
