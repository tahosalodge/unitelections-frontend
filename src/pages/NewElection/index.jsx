import React from 'react';
import Page from 'components/Page';
import { Formik, Form } from 'formik';
import Grid from '@material-ui/core/Grid';
import DateField from 'components/Fields/Date';

const NewElection = () => (
  <Page title="New Election">
    <Formik onSubmit={values => console.log(values)}>
      {() => (
        <Form>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <DateField label="Date 1" name="date1" />
            </Grid>
            <Grid item xs={12}>
              <DateField label="Date 2" name="date2" />
            </Grid>
            <Grid item xs={12}>
              <DateField label="Date 3" name="date3" />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  </Page>
);

export default NewElection;
