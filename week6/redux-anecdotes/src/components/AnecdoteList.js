import React from 'react'
import { newVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.newVote(anecdote)
    props.setNotification(`anecdote ${anecdote.id} voted`, 5)
  }

  const { visibleAnecdotes } = props

  return (
    <div>
      {visibleAnecdotes.map((anecdote) =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  const filtered = filter === 'ALL'
    ? anecdotes
    : anecdotes.filter(anecdote =>
        anecdote.content.toUpperCase().includes(filter.toUpperCase())
      )

  const sorted = filtered.sort((a, b) => b.votes - a.votes)

  return sorted
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  newVote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)
export default ConnectedAnecdoteList
