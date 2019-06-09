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

  const { visibleAnecdotes } = props

  return (
    <div>
      {visibleAnecdotes.map((anecdote, i) =>
        <div key={i}>
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
  reset
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)
export default ConnectedAnecdoteList
