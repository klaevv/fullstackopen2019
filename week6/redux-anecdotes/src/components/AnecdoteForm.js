import React from 'react'
import { connect } from 'react-redux'
import { newNote } from '../reducers/anecdoteReducer'
import { reset } from '../reducers/messageReducer'

const AnecdoteForm = (props) => {
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    props.newNote(content)
    event.target.note.value = ''
    resetNotification()
  }

  const resetNotification = () => {
    setTimeout(() => {
      props.reset()
    }, 5000)
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

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  newNote,
  reset
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteForm)
export default ConnectedAnecdoteForm
