import React from 'react';
import { Formik, Form } from 'formik';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Page from 'components/Page';
import TextField from 'components/Fields/Text';
import AddressField from 'components/Fields/Address';
import SelectField from 'components/Fields/Select';

const styles = theme => ({
  inputs: {
    width: '100%',
    margin: 0,
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
  },
});

const NewUnit = ({ classes }) => (
  <Page title="New Unit">
    <Formik onSubmit={values => console.log(values)}>
      {({ handleSubmit }) => (
        <Form>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <SelectField
                label="Unit Type"
                name="type"
                options={[
                  { value: 'troop', label: 'Troop' },
                  { value: 'crew', label: 'Crew' },
                  { value: 'ship', label: 'Ship' },
                ]}
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
            <Grid item xs={12}>
              <TextField
                name="activeMembers"
                label="Active Members"
                className={classes.inputs}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="meetingTime"
                label="Meeting Time"
                type="time"
                className={classes.inputs}
                InputLabelProps={{
                  shrink: true,
                }}
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
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Create Unit
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  </Page>
);

export default withStyles(styles)(NewUnit);
