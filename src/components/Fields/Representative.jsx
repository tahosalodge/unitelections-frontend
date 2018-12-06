import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from './Text';

const Representative = ({ label, name, classes, unitLeader }) => (
  <Fragment>
    <br />
    <Typography variant="body1">{label}</Typography>
    <Grid container spacing={24}>
      <Grid item xs={12} sm={6}>
        <TextField
          autoFocus
          margin="normal"
          name={`${name}.fname`}
          label="First Name"
          className={classes.inputs}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          autoFocus
          margin="normal"
          name={`${name}.lname`}
          label="Last Name"
          className={classes.inputs}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          autoFocus
          margin="normal"
          name={`${name}.phone`}
          label="Phone"
          className={classes.inputs}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          autoFocus
          margin="normal"
          name={`${name}.email`}
          label="Email Address"
          className={classes.inputs}
        />
      </Grid>
      {unitLeader && (
        <Fragment>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              margin="normal"
              name={`${name}.involvement`}
              label="Involvement"
              className={classes.inputs}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              margin="normal"
              name={`${name}.position`}
              label="Leadership Position"
              className={classes.inputs}
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
