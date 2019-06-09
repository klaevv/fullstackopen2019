import React from 'react'
import { connect } from 'react-redux'
import { newNote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const AnecdoteForm = (props) => {
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    props.newNote(content)
    props.setNotification(`new anecdote ${content} added`, 5)
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

export default connect(
  null, { newNote, setNotification }
)(AnecdoteForm)
