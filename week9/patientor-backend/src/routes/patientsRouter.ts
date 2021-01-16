import express from 'express';
import patientsService from '../services/patientsService';
import { Patient } from '../types';
import { toNewPatientEntry, toNewEntry } from '../utils';

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

router.get('/:id', (req, res) => {
    res.send(patientsService.getPatient(req.params.id));
});

router.post('/:id/entries', (req, res) => {
    const patient = patientsService.findById(req.params.id) as Patient;

    if (patient) {
        try {
            const newEntry = toNewEntry(req.body);
            const updatedPatient = patientsService.addEntry(patient, newEntry);
            res.json(updatedPatient);
        } catch (e) {
            res.status(400).send({ error: 'an error occurred' });
        }
    } else {
        res.status(404).send({ error: 'Sorry, this patient does not exist' });
    }
});

export default router;
