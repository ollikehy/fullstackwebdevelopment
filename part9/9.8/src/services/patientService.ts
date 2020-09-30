import patients from "../../data/patients"
import { Patient, CensoredPatient, NewPatient } from '../types';

const getPatients = (): Array<Patient> => {
    return patients;
}

const getCensoredPatients = (): CensoredPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

const addPatient = (body: NewPatient): CensoredPatient => {
    const newPatient = {
        id: patients.length + 1 + '',
        name: body.name,
        ssn: body.ssn,
        dateOfBirth: body.dateOfBirth,
        occupation: body.occupation,
        gender: body.gender
    }

    return { id: newPatient.id, name: newPatient.name, dateOfBirth: newPatient.dateOfBirth, occupation: newPatient.occupation, gender: newPatient.gender };
}

export default {
    getPatients,
    getCensoredPatients,
    addPatient
}