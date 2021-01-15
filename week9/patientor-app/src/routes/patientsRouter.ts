import express from 'express';
import patientsService from '../services/patientsService';
import { Patient } from '../types';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry: Patient = toNewPatientEntry(req.body);

        const addedEntry: Patient = patientsService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (e) {
        res.status(400).send('Error');
    }
});

export default router;
