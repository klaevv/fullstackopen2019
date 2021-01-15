import patients from '../data/patients.json';

import { Patient, NonSensitivePatient } from '../types';

const getPatients = (): Patient[] => {
    return patients as Patient[];
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(
        ({ id, name, dateOfBirth, occupation, gender }) =>
            ({
                id,
                name,
                dateOfBirth,
                occupation,
                gender,
            } as Patient)
    );
};

const addPatient = (entry: Patient): Patient => {
    const newPatient = { ...entry };
    patients.push(newPatient);
    return newPatient;
};

const getPatient = (id: string): Patient => {
    const patient = patients.find((p) => p.id === id);
    return patient as Patient;
};

export default {
    getPatient,
    getPatients,
    getNonSensitivePatients,
    addPatient,
};
