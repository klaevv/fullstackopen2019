import diagnosis from '../data/diagnoses.json';

import { Diagnosis } from '../types';

const getDiagnosis = () : Diagnosis[] => {
  return diagnosis;
};

export default {
  getDiagnosis,
};
