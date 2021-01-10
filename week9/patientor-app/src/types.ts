export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
}

export type Gender = 'Male' | 'Female' | 'Other';

export type NonSensitivePatient = Omit<Patient, 'ssn'>;