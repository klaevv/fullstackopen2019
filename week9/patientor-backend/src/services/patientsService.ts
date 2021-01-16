import patients from '../data/patients.json';
import { Patient, NonSensitivePatient, Entry, NewEntry } from '../types';

let savedPatients = [...patients] as Patient[];

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
    const newPatient = { ...entry, entries: [] };
    patients.push(newPatient);
    return newPatient;
};

const getPatient = (id: string): Patient => {
    const patient = patients.find((p) => p.id === id);
    return patient as Patient;
};

const findById = (id: string): Patient | undefined => {
    const patient = patients.find((p) => p.id === id);
    return patient as Patient;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
    const id = `id ${new Date().getTime()}`;
    const entry = { ...newEntry, id } as Entry;
    const savedPatient = {
        ...patient,
        entries: patient.entries.concat(entry),
    };
    savedPatients = savedPatients.map((p) =>
        p.id === savedPatient.id ? savedPatient : p
    );

    return savedPatient;
};

export default {
    getPatient,
    getPatients,
    getNonSensitivePatients,
    addPatient,
    findById,
    addEntry,
};
