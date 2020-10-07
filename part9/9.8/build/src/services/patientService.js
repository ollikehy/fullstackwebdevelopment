"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const getPatients = () => {
    return patients_1.default;
};
const getCensoredPatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (body) => {
    const newPatient = {
        id: (patients_1.default.length + 1).toString(),
        name: body.name,
        ssn: body.ssn,
        dateOfBirth: body.dateOfBirth,
        occupation: body.occupation,
        gender: body.gender
    };
    return { id: newPatient.id, name: newPatient.name, dateOfBirth: newPatient.dateOfBirth, occupation: newPatient.occupation, gender: newPatient.gender };
};
exports.default = {
    getPatients,
    getCensoredPatients,
    addPatient
};
