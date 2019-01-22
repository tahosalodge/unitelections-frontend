import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik, Form } from 'formik';
import { format } from 'date-fns-tz';
import isWeekend from 'date-fns/isWeekend';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Grid from '@material-ui/core/Grid';

import timeZone from 'constants/timeZone';
import DateField from 'components/Fields/Date';
import SelectField from 'components/Fields/Select';
import { scheduleElection } from 'state/modules/election';
import { electionShape } from 'shapes/election';
import { selectElection } from 'selectors/election';

const datePickerProps = {
  shouldDisableDate: date => isWeekend(date),
};

class ScheduleElection extends React.Component {
  static propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    scheduleElection: PropTypes.func.isRequired,
    election: electionShape,
    electionId: PropTypes.string,
    unitId: PropTypes.string,
  };

  static defaultProps = {
    election: {},
    electionId: '',
    unitId: '',
  };

  state = {
    manualDate: false,
  };

  toggleManualDate = () =>
    this.setState(prev => ({ manualDate: !prev.manualDate }));

  render() {
    const { fullScreen, election, electionId, unitId, ...props } = this.props;
    const { manualDate } = this.state;
    return (
      <Dialog
        fullScreen={fullScreen}
        open
        fullWidth
        maxWidth="xs"
        aria-labelledby="scheduleElection"
      >
        <Formik
          onSubmit={values => props.scheduleElection(values)}
          initialValues={{ ...election, status: 'Scheduled' }}
        >
          {({ handleSubmit }) => (
            <Form>
              <DialogTitle id="scheduleElection">Schedule Election</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {electionId
                    ? 'Select an election date from one of the requested dates.'
                    : 'Directly schedule an election for a unit. The unit leader will be notified by email.'}
                  {election && election.date && (
                    <Fragment>
                      <br />
                      <br />
                      <strong>
                        NOTE: This election has already been scheduled.
                        Selecting another date will reschedule the election, and
                        notify the unit via email.
                      </strong>
                    </Fragment>
                  )}
                </DialogContentText>
                <br />
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <Button
                      onClick={this.toggleManualDate}
                      color="primary"
                      autoFocus
                    >
                      {manualDate ? 'Requested Dates' : 'Other Date'}
                    </Button>
                  </Grid>
                  {!manualDate &&
                    electionId &&
                    election.requestedDates.length > 0 && (
                      <Grid item xs={12}>
                        <SelectField
                          name="date"
                          label="Election Date"
                          options={election.requestedDates.map(reqDate => ({
                            label: format(reqDate, 'MMMM do, YYYY', {
                              awareOfUnicodeTokens: true,
                              timeZone,
                            }),
                            value: reqDate,
                          }))}
                        />
                      </Grid>
                    )}
                  {(!electionId || manualDate) && (
                    <Grid item xs={12}>
                      <DateField
                        label="Election Date"
                        name="date"
                        {...datePickerProps}
                      />
                    </Grid>
                  )}
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => window.history.back()} color="primary">
                  Cancel
                </Button>
                <Button type="submit" onClick={handleSubmit} color="primary">
                  Schedule Election
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    );
  }
}

const mapStateToProps = (state, props) => ({
  election: selectElection(state, props),
});

export default compose(
  connect(
    mapStateToProps,
    { scheduleElection }
  ),
  withMobileDialog()
)(ScheduleElection);
