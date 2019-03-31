import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const sum = good + neutral + bad
  const avg = (good - bad) / sum
  const positives = (good / sum) * 100

  return (
    <div>
      <h1>Anna palautetta</h1>
      <button onClick={() => setGood(good + 1)}>
        Hyvä :)
      </button>
      <button onClick={() => setNeutral(neutral + 1)} >
        Neutraali :|
      </button>
      <button onClick={() => setBad(bad + 1)} >
        Huono :(
      </button>
      <h2>Statistiikkaa</h2>
      <p>Hyvä: {good}</p>
      <p>Neutraali: {neutral}</p>
      <p>Huono: {bad}</p>
      <p>Yhteensä: {sum}</p>
      <p>Keskiarvo: {avg ? avg : 0}</p>
      <p>Positiivisia {positives ? positives : 0} %</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
