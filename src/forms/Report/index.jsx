import React from 'react';
import Page from 'components/Page';
import { Formik, Form } from 'formik';
import TextField from 'components/Fields/Text';
import CheckboxGroup from 'components/Fields/CheckboxGroup';
import { withStyles } from '@material-ui/core';

const candidates = [
  {
    _id: '123',
    fname: 'Kevin',
    lname: 'McKernan',
  },
  {
    _id: '456',
    fname: 'Mike',
    lname: 'McKernan',
  },
  {
    _id: '789',
    fname: 'Maxine',
    lname: 'McKernan',
  },
];

const styles = theme => ({
  inputs: {
    margin: theme.spacing.unit * 2,
    width: '95%',
  },
  submit: {
    marginTop: theme.spacing.unit * 4,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
});

const ElectionReport = ({ classes }) => (
  <Page title="Election Report">
    <Formik
      onSubmit={values => console.log(values)}
      initialValues={{ candidates: [] }}
    >
      {({ values }) => (
        <Form>
          <TextField
            name="youthAttendance"
            label="Youth Attendance"
            className={classes.inputs}
          />
          <TextField
            name="election1Ballots"
            label="Election #1 - Ballots Received"
            className={classes.inputs}
          />
          <TextField
            name="election2Ballots"
            label="Election #2 - Ballots Received"
            className={classes.inputs}
          />
          <CheckboxGroup
            name="candidates"
            options={candidates}
            classes={classes}
            values={values}
          />
        </Form>
      )}
    </Formik>
  </Page>
);

export default withStyles(styles)(ElectionReport);
