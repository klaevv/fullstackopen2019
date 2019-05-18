import React from 'react'
import { newVote } from '../reducers/anecdoteReducer'
import { reset } from '../reducers/messageReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const vote = (id) => {
    props.newVote(id)
    resetNotification()
  }

  const resetNotification = () => {
    setTimeout(() => {
      props.reset()
    }, 5000)
  }

  const {
    anecdotes,
    filter
  } = props

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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  newVote,
  reset
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)
export default ConnectedAnecdoteList
