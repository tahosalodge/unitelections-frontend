import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, FieldArray } from 'formik';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import CheckboxGroup from 'components/Fields/CheckboxGroup';
import SelectField from 'components/Fields/Select';
import TextField from 'components/Fields/Text';
import { arrayOfCandidates } from 'shapes/candidate';
import { electionShape } from 'shapes/election';
import validationSchema from './validationSchema';

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
  removeButton: {
    marginTop: theme.spacing.unit * 2.2,
  },
});

const ElectionReportForm = ({
  election,
  classes,
  candidates,
  ballot,
  ...props
}) => (
  <Formik
    onSubmit={values => props.reportElection(election._id, values)}
    initialValues={{ ballot }}
    validationSchema={validationSchema}
  >
    {({ values, handleSubmit, isValid }) => (
      <Form>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              name="youthAttendance"
              label="Youth Attendance"
              className={classes.inputs}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="election1Ballots"
              label="Election 1 | # of Ballots Received"
              className={classes.inputs}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="election2Ballots"
              label="Election 2 | # of Ballots Received"
              className={classes.inputs}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Election Team</Typography>
            <FieldArray
              name="electionTeam"
              render={arrayHelpers => (
                <Grid container spacing={8}>
                  <Grid item xs={8}>
                    {values.electionTeam &&
                      values.electionTeam.map((relationship, index) => (
                        // eslint-disable-next-line
                        <Grid container spacing={24} key={index}>
                          <Grid item xs={8}>
                            <TextField
                              label="Name"
                              name={`electionTeam[${index}].name`}
                              className={classes.inputs}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <SelectField
                              label="Age"
                              name={`electionTeam[${index}].age`}
                              options={['Youth', 'Adult']}
                              className={classes.inputs}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <IconButton
                              type="button"
                              color="primary"
                              onClick={() => arrayHelpers.remove(index)}
                              className={classes.removeButton}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="button"
                      color="secondary"
                      variant="contained"
                      onClick={() =>
                        arrayHelpers.push({
                          model: '',
                          organization: '',
                          canManage: false,
                        })
                      }
                    >
                      Add Election Team Member
                    </Button>
                  </Grid>
                </Grid>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckboxGroup
              name="ballot"
              options={candidates}
              classes={classes}
              values={values}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              onClick={handleSubmit}
              color="primary"
              disabled={!isValid}
              variant="contained"
            >
              Report Election
            </Button>
          </Grid>
        </Grid>
      </Form>
    )}
  </Formik>
);

ElectionReportForm.propTypes = {
  reportElection: PropTypes.func.isRequired,
  candidates: arrayOfCandidates.isRequired,
  ballot: PropTypes.shape({}).isRequired,
  election: electionShape.isRequired,
};

export default withStyles(styles)(ElectionReportForm);
