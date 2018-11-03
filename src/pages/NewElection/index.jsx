import React from 'react';
import Page from 'components/Page';
import { Formik, Form } from 'formik';
import DateField from 'components/Fields/Date';

const NewElection = () => (
  <Page title="New Election">
    <Formik onSubmit={values => console.log(values)}>
      {() => (
        <Form>
          <DateField label="Date 1" name="date1" />
          <DateField label="Date 2" name="date2" />
          <DateField label="Date 3" name="date3" />
        </Form>
      )}
    </Formik>
  </Page>
);

export default NewElection;
