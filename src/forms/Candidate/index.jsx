import React from 'react';
import PropTypes from 'prop-types';
import compose from 'lodash/fp/compose';
import { Link } from '@reach/router';
import { Formik, Form } from 'formik';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from 'components/Fields/Text';
import DateField from 'components/Fields/Date';
import AddressField from 'components/Fields/Address';
import SelectField from 'components/Fields/Select';
import { rank } from 'constants/fields';
import { candidateShape } from 'shapes/candidate';
import validationSchema from './validationSchema';

const styles = theme => ({
  inputs: {
    // margin: theme.spacing.unit * 2,
    width: '95%',
  },
  submit: {
    marginTop: theme.spacing.unit * 4,
  },
});

const CandidateForm = ({ classes, cancelPath, initialValues, ...props }) => (
  <Formik
    onSubmit={values => props.onSave(values)}
    initialValues={initialValues}
    validationSchema={validationSchema}
  >
    {({ handleSubmit, isValid }) => (
      <Form>
        <DialogTitle id="add-candidate-title">Add Candidate</DialogTitle>
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
              <DateField
                name="dob"
                label="Date of Birth (mm/dd/yyyy)"
                keyboard
                className={classes.inputs}
                format="MM/dd/yyyy"
                placeholder="01/01/2000"
                mask={value =>
                  value
                    ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
                    : []
                }
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
              <TextField
                name="parentPhone"
                label="Parent Phone"
                className={classes.inputs}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="parentEmail"
                label="Parent Email"
                className={classes.inputs}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="youthPhone"
                label="Youth Phone (Optional)"
                className={classes.inputs}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="youthEmail"
                label="Youth Email (Optional)"
                className={classes.inputs}
              />
            </Grid>
            <Grid item xs={12}>
              <AddressField
                name="address"
                classes={classes}
                showLabel={false}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectField
                name="rank"
                label="Rank"
                options={rank.troop}
                className={classes.inputs}
              />
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
);

CandidateForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  cancelPath: PropTypes.string.isRequired,
  initialValues: candidateShape.isRequired,
};

export default compose(withStyles(styles))(CandidateForm);
