import express from 'express';
import patientService from '../services/patientService';
import validations from '../utils/validation';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getCensoredPatients());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(patientService.getPatient(id));
});

router.post('/:id/entries', (req, res) => {
    const newEntry = validations.toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    res.status(200).send(addedEntry);
});

router.post('/', (req, res) => {
    const newPatient = validations.toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.status(200).send(addedPatient);
});

export default router;