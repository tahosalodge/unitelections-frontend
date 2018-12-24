import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Link } from '@reach/router';

const UserActions = ({
  classes,
  onClose,
  selectedValue,
  userId,
  deleteUser,
  ...props
}) => (
  <Dialog
    onClose={onClose}
    aria-labelledby="simple-dialog-title"
    open={!!userId || false}
    {...props}
  >
    <DialogTitle id="simple-dialog-title">Account Actions</DialogTitle>
    <div>
      <List>
        <ListItem button onClick={onClose} component={Link} to={userId}>
          <ListItemText primary="Edit User" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Reset Password" />
        </ListItem>
        <ListItem button onClick={() => deleteUser(userId)}>
          <ListItemText primary="Delete User" />
        </ListItem>
      </List>
    </div>
  </Dialog>
);

UserActions.propTypes = {
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default UserActions;
