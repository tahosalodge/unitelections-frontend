import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik, Form } from 'formik';
import { Link } from '@reach/router';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from 'components/Form/TextField';
import { register } from 'state/modules/auth';

const Register = ({ fullScreen, ...props }) => (
  <Dialog fullScreen={fullScreen} open aria-labelledby="register">
    <Formik onSubmit={values => props.register(values)}>
      {({ handleSubmit }) => (
        <Form>
          <DialogTitle id="register">Create an account</DialogTitle>
          <DialogContent>
            <DialogContentText>Helper text goes here.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="fname"
              label="First Name"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              name="lname"
              label="Last Name"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              margin="dense"
              name="password"
              label="Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button component={Link} to="/" color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              color="primary"
              autoFocus
            >
              Register
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  </Dialog>
);

Register.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
};

export default compose(
  connect(
    null,
    { register }
  ),
  withMobileDialog()
)(Register);
