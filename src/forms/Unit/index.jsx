import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'lodash/fp/compose';
import { Formik, Form } from 'formik';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createUnit } from 'state/modules/unit';
import { getChapters } from 'selectors/auth';
import { chapterShape } from 'shapes/auth';
import { unitShape } from 'shapes/unit';
import TextField from 'components/Fields/Text';
import TimeField from 'components/Fields/Time';
import AddressField from 'components/Fields/Address';
import RepresentativeField from 'components/Fields/Representative';
import SelectField from 'components/Fields/Select';
import validationSchema from './validationSchema';

const styles = theme => ({
  inputs: {
    width: '100%',
    margin: 0,
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
  },
});

const NewUnit = ({ classes, chapters, unit, ...props }) => (
  <Formik
    onSubmit={values => props.createUnit(values)}
    initialValues={{ meetingTime: Date.now(), ...unit }}
    validationSchema={validationSchema}
  >
    {({ handleSubmit, isValid }) => (
      <Form>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <SelectField
              label="District"
              name="chapter"
              options={
                chapters &&
                chapters.map(chapter => ({
                  label: chapter.district,
                  value: chapter._id,
                }))
              }
              className={classes.inputs}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectField
              label="Unit Type"
              name="unitType"
              options={['Troop', 'Crew', 'Ship']}
              className={classes.inputs}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              name="number"
              label="Unit Number"
              className={classes.inputs}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="activeMembers"
              label="Active Members"
              className={classes.inputs}
            />
          </Grid>
          <Grid item xs={12}>
            <TimeField
              className={classes.inputs}
              name="meetingTime"
              autoOk
              label="Meeting Time"
            />
          </Grid>
          <Grid item xs={12}>
            <AddressField
              label="Meeting Location"
              name="meetingLocation"
              classes={classes}
              notes
            />
          </Grid>
          <Grid item xs={12}>
            <RepresentativeField
              label="Unit Leader"
              name="unitLeader"
              classes={classes}
              unitLeader
            />
          </Grid>
          <Grid item xs={12}>
            <RepresentativeField
              label="Adult Representative"
              name="adultRepresentative"
              classes={classes}
            />
          </Grid>
          <Grid item xs={12}>
            <RepresentativeField
              label="Youth Representative"
              name="youthRepresentative"
              classes={classes}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="contained"
              color="secondary"
              className={classes.submit}
              disabled={!isValid}
            >
              Create Unit
            </Button>
          </Grid>
        </Grid>
      </Form>
    )}
  </Formik>
);

NewUnit.propTypes = {
  createUnit: PropTypes.func.isRequired,
  chapters: chapterShape.isRequired,
  unit: unitShape,
};

NewUnit.defaultProps = {
  unit: {},
};

const mapStateToProps = state => ({
  chapters: getChapters(state),
});

export default compose(
  connect(
    mapStateToProps,
    { createUnit }
  ),
  withStyles(styles)
)(NewUnit);
