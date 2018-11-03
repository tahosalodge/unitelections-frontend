import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from './Text';

const Address = ({ label, name, classes, notes }) => (
  <Fragment>
    <Typography variant="body1">{label}</Typography>
    <Grid container spacing={24}>
      <TextField
        autoFocus
        margin="normal"
        name={`${name}.address1`}
        label="Address"
        className={classes.inputs}
      />
      <TextField
        autoFocus
        margin="normal"
        name={`${name}.city`}
        label="City"
        className={classes.inputs}
      />
      <TextField
        autoFocus
        margin="normal"
        name={`${name}.state`}
        label="State"
        className={classes.inputs}
      />
      <TextField
        autoFocus
        margin="normal"
        name={`${name}.zip`}
        label="ZIP"
        className={classes.inputs}
      />
      {notes && (
        <TextField
          autoFocus
          margin="normal"
          name={`${name}.notes`}
          label="Notes"
          multiline
          rowsMax="4"
          className={classes.inputs}
          helperText="Any other details about your meeting location (where in a building, how to get in, etc)"
        />
      )}
    </Grid>
  </Fragment>
);

Address.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  notes: PropTypes.bool,
};

Address.defaultProps = {
  notes: false,
};

export default Address;
