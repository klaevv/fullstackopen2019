import patients from '../data/patients.json';

import { Patient, NonSensitivePatient } from '../types';

const getPatients = (): Patient[] => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, occupation, gender }) => ({
        id,
        name,
        dateOfBirth,
        occupation,
        gender,
    }));
};

const addPatient = (entry: Patient): Patient => {
    const newPatient = { ...entry };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
};
