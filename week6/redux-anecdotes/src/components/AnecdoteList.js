import React from 'react'
import { newVote } from '../reducers/anecdoteReducer'
import { reset } from '../reducers/messageReducer'

const AnecdoteList = ({ store }) => {
  const vote = (id) => {
    store.dispatch(newVote(id))
    resetNotification()
  }

  const resetNotification = () => {
    setTimeout(() => {
      store.dispatch(reset())
    }, 5000)
  }

  const {
    anecdotes,
    filter
  } = store.getState()

  const filtered = filter === 'ALL'
    ? anecdotes
    : anecdotes.filter(anecdote =>
        anecdote.content.toUpperCase().includes(filter.toUpperCase())
      )
  const sorted = filtered.sort((a, b) => b.votes - a.votes)

  return (
    <div>
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
    </div>
  )
}

export default AnecdoteList
