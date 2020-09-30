import express from 'express';
import patientService from '../services/patientService';
import validations from '../utils/validation';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getCensoredPatients());
})

router.post('/', (req, res) => {
    const newPatient = validations.toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.status(200).send(addedPatient);
})

export default router;