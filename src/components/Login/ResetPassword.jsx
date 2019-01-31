import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik, Form } from 'formik';
import { Link, Redirect } from '@reach/router';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from 'components/Form/TextField';
import { login, requestNewPassword } from 'state/modules/auth';
import authShape from 'shapes/auth';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
});

const RequestNewPassword = ({ fullScreen, ...props }) => {
  if (props.auth.loggedIn) {
    return <Redirect to="/dashboard" noThrow />;
  }
  return (
    <Dialog
      fullScreen={fullScreen}
      open
      aria-labelledby="requestNewPassword"
      fullWidth
      maxWidth="xs"
    >
      <Formik
        onSubmit={values => props.requestNewPassword(values)}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <Form>
            <DialogTitle id="requestNewPassword">
              Request New Password
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button component={Link} to="/" color="primary">
                Cancel
              </Button>
              <Button type="submit" onClick={handleSubmit} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

RequestNewPassword.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  requestNewPassword: PropTypes.func.isRequired,
  auth: authShape.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default compose(
  connect(
    mapStateToProps,
    { login, requestNewPassword }
  ),
  withMobileDialog()
)(RequestNewPassword);
