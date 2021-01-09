import express from 'express';
import diagnosisRouter from './src/routes/diagnosisRouter';
import patientsRouter from './src/routes/patientsRouter';

const app = express();

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientsRouter);
app.use(express.json());

const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
