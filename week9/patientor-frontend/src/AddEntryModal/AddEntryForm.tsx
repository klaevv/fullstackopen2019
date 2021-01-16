import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import * as yup from 'yup';
import { Field, Formik, Form } from 'formik';

import { useStateValue } from '../state';
import { NewEntry } from '../types';

import { TextField, DiagnosesPicker } from '../components/FormField';
import EntryTypeFields from './EntryTypeFields';

interface Props {
    initialValues: NewEntry;
    validationSchema: yup.ObjectSchema;
    onSubmit: (values: NewEntry) => void;
    onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({
    onSubmit,
    onCancel,
    initialValues,
    validationSchema,
}) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
                return (
                    <Form className="form ui">
                        <Field
                            component={TextField}
                            label="Description"
                            name="description"
                            placeholder="Description"
                        />
                        <Field
                            component={TextField}
                            label="Date"
                            name="date"
                            placeholder="YYYY-MM-DD"
                        />
                        <Field
                            component={TextField}
                            label="Specialist"
                            name="specialist"
                            placeholder="Specialist"
                        />
                        <DiagnosesPicker
                            diagnoses={Object.values(diagnoses)}
                            setFieldTouched={setFieldTouched}
                            setFieldValue={setFieldValue}
                        />
                        <EntryTypeFields entryType={values.type} />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button
                                    color="red"
                                    onClick={onCancel}
                                    type="button"
                                >
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    color="green"
                                    disabled={!dirty || !isValid}
                                    floated="right"
                                    type="submit"
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;
