export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}

export enum EntryTypes {
    HospitalEntry = 'Hospital',
    OccupationalHealthcareEntry = 'OccupationalHealthcare',
    HealthCheck = 'HealthCheck'
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
}

interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: {
        date: string;
        criteria: string;
    }
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    sickLeave: {
        startDate: string;
        endDate: string;
    }
    employerName: string;

}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export type NewPatient = Omit<Patient, 'id'>;

export type CensoredPatient = Omit<Patient, 'ssn'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}
