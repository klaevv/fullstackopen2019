import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator, ExerciseFeedback } from './exerciseCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  try {
    const { weight, height } = req.query;
    if (isNaN(Number(weight)) || isNaN(Number(height))) {
      res.status(500).send({ error: 'malformatted parameters!' });
      throw new Error('malformatted parameters');
    }
    const bmi = calculateBmi(Number(weight), Number(height));
    const returnData = {
      weight,
      height,
      bmi,
    };
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(returnData));
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        error: 'something went wrong'
      })
    );
  }
});

app.post('/exercises', (_req, res) => {
  res.send({
    "data": [1, 0, 2, 0, 3, 0, 2.5],
    "target": 2.5
  });
});

app.get('/exercises', (req, res) => {
  try {
    const { data, target } = req.query;
    if (Array.isArray(data) || isNaN(Number(target))) {
      res.status(500).send({ error: 'malformatted parameters!' });
      throw new Error('malformatted parameters');
    }
    const exerciseData = exerciseCalculator(data, Number(target));
    const returnData: ExerciseFeedback = {
      ...exerciseData
    };
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(returnData));
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        error: 'something went wrong'
      })
    );
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
