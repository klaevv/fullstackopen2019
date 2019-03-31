import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) => {
  const sum = good + neutral + bad
  const avg = (good - bad) / sum
  const positives = (good / sum) * 100
  return (
    <div>
      <h2>Statistiikkaa</h2>
      <table>
        <tbody>
          <Statistic text="Hyvä" value={good} />
          <Statistic text="Neutraali" value={neutral} />
          <Statistic text="Huono" value={bad} />
          <Statistic text="Yhteensä" value={sum} />
          <Statistic text="Keskiarvo" value={avg ? avg : 0} />
          <Statistic text="Positiivisia (%)" value={positives ? positives : 0} />
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const hasFeedback = good + neutral + bad > 0

  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button onClick={() => setGood(good + 1)} text="Hyvä :)" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutraali :|" />
      <Button onClick={() => setBad(bad + 1)} text="Huono :(" />
      {hasFeedback && <Statistics good={good} neutral={neutral} bad={bad} />}
      {!hasFeedback && <p>Palautetta ei ole annettu</p>}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
