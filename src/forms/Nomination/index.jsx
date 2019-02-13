import React from 'react';
import PropTypes from 'prop-types';
import Page from 'components/Page';
import { Formik, Form } from 'formik';
import { Link } from '@reach/router';
import withStyles from '@material-ui/core/styles/withStyles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from 'components/Fields/Text';
import DateField from 'components/Fields/Date';
import AddressField from 'components/Fields/Address';
import SelectField from 'components/Fields/Select';
import { gender } from 'constants/fields';
import validationSchema from './validationSchema';

const styles = theme => ({
  inputs: {
    margin: theme.spacing.unit * 2,
    width: '95%',
  },
  submit: {
    marginTop: theme.spacing.unit * 4,
  },
});

const NominationForm = ({ classes, onSave, cancelPath, initialValues }) => (
  <Page title="New Nomination">
    <Formik
      onSubmit={values => onSave(values)}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid }) => (
        <Form>
          <DialogContent>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <TextField
                  name="bsaid"
                  label="BSA ID"
                  className={classes.inputs}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectField
                  name="gender"
                  label="Gender"
                  options={gender}
                  className={classes.inputs}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="fname"
                  label="First Name"
                  className={classes.inputs}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="lname"
                  label="Last Name"
                  className={classes.inputs}
                />
              </Grid>
              <Grid item xs={6}>
                <DateField
                  name="dob"
                  label="Date of Birth (mm/dd/yyyy)"
                  className={classes.inputs}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="phone"
                  label="Phone"
                  className={classes.inputs}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="email"
                  label="Email"
                  className={classes.inputs}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="position"
                  label="Leadership Position"
                  className={classes.inputs}
                />
              </Grid>
              <Grid item xs={12}>
                <AddressField name="address" classes={classes} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="button" component={Link} to={cancelPath}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              color="primary"
              disabled={!isValid}
            >
              Add Candidate
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  </Page>
);

NominationForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  cancelPath: PropTypes.string.isRequired,
};

export default withStyles(styles)(NominationForm);
