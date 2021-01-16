export interface Diagnosis {
    code: string;
    latin?: string;
    name: string;
}

export enum EntryType {
    HealthCheck = 'HealthCheck',
    Hospital = 'Hospital',
    OccupationalHealthCare = 'OccupationalHealthcare',
}

interface BaseEntry {
    date: string;
    description: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
    id: string;
    specialist: string;
    type: EntryType;
}

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3,
}

interface HealthCheckEntry extends BaseEntry {
    healthCheckRating: HealthCheckRating;
    type: EntryType.HealthCheck;
}

export interface SickLeave {
    endDate: string;
    startDate: string;
}

interface OccupationalHealthCareEntry extends BaseEntry {
    employerName: string;
    sickLeave?: SickLeave;
    type: EntryType.OccupationalHealthCare;
}

export interface Discharge {
    criteria: string;
    date: string;
}

interface HospitalEntry extends BaseEntry {
    discharge: Discharge;
    type: EntryType.Hospital;
}

export type Entry =
    | HealthCheckEntry
    | OccupationalHealthCareEntry
    | HospitalEntry;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type DistributiveOmit<T, K extends keyof any> = T extends any
    ? Omit<T, K>
    : never;

export type NewBaseEntry = Omit<BaseEntry, 'id'>;

export type NewEntry = DistributiveOmit<Entry, 'id'>;

export interface Patient {
    dateOfBirth: string;
    entries: Entry[];
    gender: Gender;
    id: string;
    name: string;
    occupation: string;
    ssn: string;
}

export type NewPatient = Omit<Patient, 'id' | 'entries'>;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type Gender = 'Male' | 'Female' | 'Other';

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
