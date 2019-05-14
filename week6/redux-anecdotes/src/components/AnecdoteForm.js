import React from 'react'
import { newNote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ store }) => {
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    store.dispatch(newNote(content))
    event.target.note.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
