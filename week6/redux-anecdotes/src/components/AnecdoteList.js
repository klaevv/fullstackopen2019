import React from 'react'
import { newVote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {
  const vote = (id) => {
    store.dispatch(newVote(id))
  }

  const sorted = store.getState().anecdotes.sort((a, b) => b.votes - a.votes)

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
