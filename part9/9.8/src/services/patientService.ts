import patients from "../../data/patients";
import { Patient, CensoredPatient, NewPatient, Entry } from '../types';

const getPatients = (): Array<Patient> => {
    return patients;
};

const getPatient = (id: string): Patient => {
    const patient = patients.find(patient => patient.id === id);
    if (patient) {
        return patient;
    } else {
        throw new Error('Patient not found');
    }
};

const getCensoredPatients = (): CensoredPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries: []
    }));
};

const addPatient = (body: NewPatient): CensoredPatient => {
    const newPatient = {
        id: (patients.length + 1).toString(),
        name: body.name,
        ssn: body.ssn,
        dateOfBirth: body.dateOfBirth,
        occupation: body.occupation,
        gender: body.gender
    };

    return { id: newPatient.id, name: newPatient.name, dateOfBirth: newPatient.dateOfBirth, occupation: newPatient.occupation, gender: newPatient.gender, entries: [] };
};

const addEntry = (id: string, body: Entry): Entry => {
    const patient = patients.find(patient => patient.id === id);
    patient?.entries.push(body);
    return body;
};

export default {
    getPatients,
    getPatient,
    getCensoredPatients,
    addPatient,
    addEntry
};