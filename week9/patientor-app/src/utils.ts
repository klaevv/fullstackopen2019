import { Patient } from './types';

export const toNewPatientEntry = (object: Patient): Patient => {
    return {
        id: object.id,
        name: object.name,
        dateOfBirth: object.dateOfBirth,
        occupation: object.occupation,
        gender: object.gender,
        ssn: object.ssn,
    };
};
