import { Gender, NewPatient } from '../types';

/*eslint-disable @typescript-eslint/no-explicit-any*/
/*eslint-disable  @typescript-eslint/no-unsafe-member-access*/
/*eslint-disable @typescript-eslint/restrict-template-expressions*/
/*eslint-disable  @typescript-eslint/explicit-module-boundary-types*/

const toNewPatient = (body: any): NewPatient => {
    return {
        name: parseString(body.name, 'name'),
        occupation: parseString(body.occupation, 'occupation'),
        ssn: parseString(body.ssn, 'ssn'),
        dateOfBirth: parseDate(body.dateOfBirth),
        gender: parseGender(body.gender)
    };
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const parseString = (s: any, type: string): string => {
    if (!s || !isString(s)) {
        throw new Error(`Incorrect or missing ${type}: ${s}`);
    }
    return s;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing dateOfBirth: ${date}`);
    }

    return date;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};


export default { toNewPatient };