import patients from '../data/patients.json';

import { Patient } from '../types';

const getPatients = () : Patient[] => {
  return patients;
};

const getNonSensitivePatients =
  (): Omit<Patient, 'ssn'>[] => {
    return patients.map(({ id, name, dateOfBirth, occupation, gender }) => ({ id, name, dateOfBirth, occupation, gender }));
  };

export default {
  getPatients,
  getNonSensitivePatients
};
