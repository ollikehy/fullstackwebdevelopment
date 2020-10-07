import { Entry, EntryTypes, Gender, HealthCheckRating, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';
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
        gender: parseGender(body.gender),
        entries: parseEntries(body.entries)
    };
};

const toNewEntry = (body: any): Entry => {
    const entry = {
        id: uuidv4(),
        description: parseString(body.description, 'description'),
        date: parseDate(body.date),
        specialist: parseString(body.specialist, 'specialist'),
        diagnosisCodes: parseDiagnosisCodes(body.diagnosisCodes)
    };
    switch (body.type) {
        case "Hospital":
            return {
                ...entry,
                type: 'Hospital',
                discharge: parseDischarge(body.discharge)
            };
        case "HealthCheck":
            return {
                ...entry,
                type: 'HealthCheck',
                healthCheckRating: parseHealthCheck(body.healthCheckRating)
            };
        case "OccupationalHealthcare":
            return {
                ...entry,
                type: 'OccupationalHealthcare',
                employerName: parseString(body.employerName, 'employerName'),
                sickLeave: parseSickLeave(body.sickLeave)
            };
        default:
            throw new Error(`Incorrect or missing parameters`);
    }
};

const isEntry = (entry: any): entry is Entry => {
    return Object.values(EntryTypes).includes(entry.type);
};

const isHealthCheck = (healthcheck: any): healthcheck is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(parseInt(healthcheck));
};

const parseHealthCheck = (healthcheck: any): HealthCheckRating => {
    if (!isHealthCheck(healthcheck)) {
        throw new Error(`Incorrect or missing healthcheck: ${healthcheck}`);
    }

    return healthcheck;
};

const parseSickLeave = (sickleave: any): { startDate: string, endDate: string } => {
    if (!sickleave.startDate || !isDate(sickleave.startDate) || !sickleave.endDate || !isDate(sickleave.startDate)) {
        throw new Error(`Incorrect or missing sickleave`);
    }

    return sickleave as { startDate: string, endDate: string };
};

const parseDischarge = (discharge: any): { date: string, criteria: string } => {
    if (!isDate(discharge.date) || !isString(discharge.criteria)) {
        throw new Error(`Incorrect discharge`);
    }
    return discharge as { date: string, criteria: string };
};

const parseDiagnosisCodes = (codes: string[]): string[] => {
    const parsedCodes: string[] = [];
    codes && codes.forEach(code => {
        if (!code || !isString(code)) {
            throw new Error(`Incorrect diagnosis code ${code}`);
        } else {
            parsedCodes.push(code);
        }
    });
    return parsedCodes;
};

const parseEntries = (entries: any): Entry[] => {
    const parsedEntries = entries.map((entry: Entry) => {
        if (!isEntry(entry)) {
            throw new Error(`Incorrect or missing entry ${entry}`);
        }
        return entry;
    });
    return parsedEntries as Entry[];
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
        throw new Error(`Incorrect or missing date: ${date}`);
    }

    return date;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};


export default { toNewPatient, toNewEntry };