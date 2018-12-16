import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form, FieldArray, ErrorMessage } from 'formik';
import isWeekend from 'date-fns/isWeekend';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import Page from 'components/Page';
import DateField from 'components/Fields/Date';
import { createElection } from 'state/modules/election';
import { minDate } from 'utils/dates';
import validate from './validate';

const datePickerProps = {
  minDate,
  shouldDisableDate: date => isWeekend(date),
};

const NewElection = ({ unitId, ...props }) => (
  <Page title="Request Election">
    <Formik
      onSubmit={values => props.createElection(values, unitId)}
      initialValues={{ requestedDates: [minDate], unitId }}
      validate={validate}
    >
      {({ handleSubmit, values }) => (
        <Form>
          <Grid container spacing={24}>
            <FieldArray
              name="requestedDates"
              render={arrayHelpers => (
                <Fragment>
                  <Grid item xs={12}>
                    {values.requestedDates &&
                      values.requestedDates.map((date, index) => (
                        // eslint-disable-next-line
                        <Grid container spacing={24} key={index}>
                          <Grid item xs={2}>
                            <DateField
                              label={`Date ${index + 1}`}
                              name={`requestedDates.${index}`}
                              {...datePickerProps}
                            />
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              type="button"
                              color="primary"
                              onClick={() => arrayHelpers.remove(index)}
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
                      color="primary"
                      variant="contained"
                      onClick={() => arrayHelpers.push(minDate)}
                    >
                      Add a date
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <ErrorMessage name="requestedDates" />
                  </Grid>
                </Fragment>
              )}
            />
            <Grid item xs={12}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="secondary"
              >
                Request Election
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  </Page>
);

NewElection.propTypes = {
  createElection: PropTypes.func.isRequired,
  unitId: PropTypes.string.isRequired,
};

export default connect(
  null,
  { createElection }
)(NewElection);
