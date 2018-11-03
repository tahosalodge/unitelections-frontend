import React from 'react';
import { Formik, Form } from 'formik';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Page from 'components/Page';
import TextField from 'components/Fields/Text';
import AddressField from 'components/Fields/Address';
import SelectField from 'components/Fields/Select';

const styles = theme => ({
  inputs: {
    margin: theme.spacing.unit * 2,
    width: '95%',
  },
  submit: {
    marginTop: theme.spacing.unit * 4,
  },
});

const NewUnit = ({ classes }) => (
  <Page title="New Unit">
    <Formik onSubmit={values => console.log(values)}>
      {({ handleSubmit }) => (
        <Form>
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
          <TextField
            autoFocus
            name="number"
            label="Unit Number"
            className={classes.inputs}
          />
          <TextField
            name="activeMembers"
            label="Active Members"
            className={classes.inputs}
          />
          <TextField
            name="meetingTime"
            label="Meeting Time"
            type="time"
            className={classes.inputs}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <AddressField
            label="Meeting Location"
            name="meetingLocation"
            classes={classes}
            notes
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Create Unit
          </Button>
        </Form>
      )}
    </Formik>
  </Page>
);

export default withStyles(styles)(NewUnit);
