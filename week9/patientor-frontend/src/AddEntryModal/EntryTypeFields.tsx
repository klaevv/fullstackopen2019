import React from 'react';
import { Field } from 'formik';
import { Header } from 'semantic-ui-react';

import { EntryType } from '../types';
import { NumberField, TextField } from '../components/FormField';

interface Props {
    entryType: EntryType;
}

const EntryTypeFields: React.FC<Props> = ({ entryType }) => {
    switch (entryType) {
        case EntryType.HealthCheck:
            return (
                <Field
                    component={NumberField}
                    label="Health Check Rating"
                    max={3}
                    min={0}
                    name="healthCheckRating"
                />
            );
        case EntryType.OccupationalHealthCare:
            return (
                <>
                    <Field
                        component={TextField}
                        label="Employer Name"
                        name="employerName"
                        placeholder="Employer Name"
                    />

                    <Header size="small">Sick Leave</Header>

                    <Field
                        component={TextField}
                        label="Start Date"
                        name="sickLeave.startDate"
                        placeholder="YYYY-MM-DD"
                    />
                    <Field
                        component={TextField}
                        label="End Date"
                        name="sickLeave.endDate"
                        placeholder="YYYY-MM-DD"
                    />
                </>
            );

        case EntryType.Hospital:
            return (
                <>
                    <Header size="small">Discharge</Header>

                    <Field
                        component={TextField}
                        label="Date"
                        name="discharge.date"
                        placeholder="YYYY-MM-DD"
                    />
                    <Field
                        component={TextField}
                        label="Criteria"
                        name="discharge.criteria"
                        placeholder="Criteria"
                    />
                </>
            );
        default:
            return null;
    }
};

export default EntryTypeFields;
