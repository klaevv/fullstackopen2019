import express from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack')
})

app.get('/bmi', (req, res) => {
  try {
    const { weight, height } = req.query
    if (isNaN(Number(weight)) || isNaN(Number(height))) {
      res.status(500).send({ error: 'malformatted parameters!' })
      throw new Error('malformatted parameters')
    }
    const bmi = calculateBmi(Number(weight), Number(height))
    const returnData = {
      weight,
      height,
      bmi,
    }
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(returnData))
  } catch (error) {
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        error,
      })
    )
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
