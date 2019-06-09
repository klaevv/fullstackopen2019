import React from 'react'
import { connect } from 'react-redux'
import { newNote } from '../reducers/anecdoteReducer'
import { reset } from '../reducers/messageReducer'
import anecdoteService from '../services/AnecdoteService'

const AnecdoteForm = (props) => {
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    const newNote = await anecdoteService.createNew(content)
    // event.target.note.value = ''
    props.newNote(newNote.content)
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
