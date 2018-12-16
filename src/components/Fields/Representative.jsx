import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from './Text';
import SelectField from './Select';

const Representative = ({ label, name, classes, unitLeader }) => (
  <Fragment>
    <br />
    <Typography variant="body1">{label}</Typography>
    <Grid container spacing={24}>
      <Grid item xs={12} sm={6}>
        <TextField
          autoFocus
          name={`${name}.fname`}
          label="First Name"
          className={classes.inputs}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          name={`${name}.lname`}
          label="Last Name"
          className={classes.inputs}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          name={`${name}.phone`}
          label="Phone"
          className={classes.inputs}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          name={`${name}.email`}
          label="Email Address"
          className={classes.inputs}
        />
      </Grid>
      {unitLeader && (
        <Fragment>
          <Grid item xs={12} sm={6}>
            <SelectField
              name={`${name}.position`}
              label="Leadership Position"
              className={classes.inputs}
              options={[
                'Scoutmaster',
                'Assistant Scoutmaster',
                'Committee Member',
                'Advancement Chair',
              ]}
            />
          </Grid>
        </Fragment>
      )}
    </Grid>
  </Fragment>
);

Representative.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  unitLeader: PropTypes.bool,
};

Representative.defaultProps = {
  unitLeader: false,
};

export default Representative;
