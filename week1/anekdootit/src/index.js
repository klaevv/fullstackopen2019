import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const handleVote = ({index, votes, setVotes}) => {
  const copy = { ...votes }
  copy[index] += 1
  setVotes(copy)
}

const TopAnecdote = ({anecdotes, votes}) => {
  let max = 0
  let selected = 0
  for (let index = 0; index < anecdotes.length; index++) {
    if (votes[index] > max) {
      max = votes[index]
      selected = index
    }
  }
  return (
    <div>
      <h1>Top anecdote</h1>
      {anecdotes[selected]}
      <br />
      Has {votes[selected]} votes
    </div>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Button
        onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}
        text="New anecdote"
      />
      <Button
        onClick={() => handleVote({index: selected, votes, setVotes})}
        text="Vote"
      />
      <br />
      {anecdotes[selected]}
      <br />
      Has {votes[selected]} votes
      <TopAnecdote
        anecdotes={anecdotes}
        votes={votes}
      />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
