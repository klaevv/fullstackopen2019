import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeNotes } from './reducers/anecdoteReducer'

const App = ({ store, initializeNotes }) => {
  useEffect(() => {
    initializeNotes()
  },[])

  return (
    <div>
      <h2>Programming anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, { initializeNotes })(App)
