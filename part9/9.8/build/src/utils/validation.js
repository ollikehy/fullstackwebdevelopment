"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
/*eslint-disable @typescript-eslint/no-explicit-any*/
/*eslint-disable  @typescript-eslint/no-unsafe-member-access*/
/*eslint-disable @typescript-eslint/restrict-template-expressions*/
/*eslint-disable  @typescript-eslint/explicit-module-boundary-types*/
const toNewPatient = (body) => {
    return {
        name: parseString(body.name, 'name'),
        occupation: parseString(body.occupation, 'occupation'),
        ssn: parseString(body.ssn, 'ssn'),
        dateOfBirth: parseDate(body.dateOfBirth),
        gender: parseGender(body.gender)
    };
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).includes(gender);
};
const parseString = (s, type) => {
    if (!s || !isString(s)) {
        throw new Error(`Incorrect or missing ${type}: ${s}`);
    }
    return s;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing dateOfBirth: ${date}`);
    }
    return date;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};
exports.default = { toNewPatient };
