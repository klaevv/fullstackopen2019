import { Patient, NewEntry, NewBaseEntry, EntryType } from './types';

export const toNewPatientEntry = (object: Patient): Patient => {
    return {
        id: object.id,
        name: object.name,
        dateOfBirth: object.dateOfBirth,
        occupation: object.occupation,
        gender: object.gender,
        ssn: object.ssn,
        entries: object.entries,
    };
};

const toNewBaseEntry = (object: NewBaseEntry): NewBaseEntry => {
    const newBaseEntry: NewBaseEntry = {
        type: object.type,
        description: object.description,
        date: object.date,
        specialist: object.specialist,
    } as NewBaseEntry;

    if (object.diagnosisCodes) {
        newBaseEntry.diagnosisCodes = object.diagnosisCodes;
    }

    return newBaseEntry;
};

export const toNewEntry = (object: NewEntry): NewEntry => {
    const newBaseEntry = toNewBaseEntry(object) as NewEntry;

    switch (newBaseEntry.type) {
        case EntryType.HealthCheck:
            return {
                ...newBaseEntry,
            };
        case EntryType.OccupationalHealthCare:
            const newEntry = {
                ...newBaseEntry,
            };
            return newEntry;
        case EntryType.Hospital:
            return {
                ...newBaseEntry,
            };
        default:
            return assertNever(newBaseEntry);
    }
};

export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};
