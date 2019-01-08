import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik, Form } from 'formik';
import { Link } from '@reach/router';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from 'components/Form/TextField';
import { resetPassword } from 'state/modules/auth';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
});

const Register = ({ fullScreen, email, token, ...props }) => (
  <Dialog fullScreen={fullScreen} open aria-labelledby="resetPassword">
    <Formik
      onSubmit={values => props.resetPassword(values)}
      initialValues={{ email, token }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <Form>
          <DialogTitle id="resetPassword">Reset Password</DialogTitle>
          <DialogContent>
            <DialogContentText>Helper text goes here.</DialogContentText>
            <TextField
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              disabled
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
              Reset Password
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  </Dialog>
);

Register.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  resetPassword: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default compose(
  connect(
    null,
    { resetPassword }
  ),
  withMobileDialog()
)(Register);
