import React from 'react';
import Page from 'components/Page';
import { Formik, Form } from 'formik';
import TextField from 'components/Fields/Text';
import DateField from 'components/Fields/Date';
import AddressField from 'components/Fields/Address';
import SelectField from 'components/Fields/Select';
import { gender } from 'constants/fields';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  inputs: {
    margin: theme.spacing.unit * 2,
    width: '95%',
  },
  submit: {
    marginTop: theme.spacing.unit * 4,
  },
});

const CandidateForm = ({ classes }) => (
  <Page title="New Candidate">
    <Formik onSubmit={values => console.log(values)}>
      {() => (
        <Form>
          <TextField name="bsaid" label="BSA ID" className={classes.inputs} />
          <TextField
            name="fname"
            label="First Name"
            className={classes.inputs}
          />
          <TextField
            name="lname"
            label="Last Name"
            className={classes.inputs}
          />
          <SelectField
            name="gender"
            label="Gender"
            options={gender}
            className={classes.inputs}
          />
          <DateField
            name="dob"
            label="Date of Birth (mm/dd/yyyy)"
            className={classes.inputs}
          />
          <TextField name="phone" label="Phone" className={classes.inputs} />
          <TextField name="email" label="Email" className={classes.inputs} />
          <AddressField name="address" classes={classes} />
          <TextField
            name="position"
            label="Leadership Position"
            className={classes.inputs}
          />
        </Form>
      )}
    </Formik>
  </Page>
);

export default withStyles(styles)(CandidateForm);
