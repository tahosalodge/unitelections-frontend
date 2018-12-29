import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Confirm from 'components/Confirm';
import { Feature, IS_ADMIN } from 'utils/features';

const LodgeActions = ({
  classes,
  onClose,
  selectedValue,
  lodgeId,
  deleteLodge,
  ...other
}) => (
  <Dialog
    onClose={onClose}
    aria-labelledby="simple-dialog-title"
    open={!!lodgeId || false}
    {...other}
  >
    <DialogTitle id="simple-dialog-title">Lodge Actions</DialogTitle>
    <List>
      <ListItem button>
        <ListItemText primary="Add User" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Edit Lodge" />
      </ListItem>
      <Feature name={IS_ADMIN}>
        <Confirm
          button
          onClick={() => deleteLodge(lodgeId)}
          text="Delete Election"
        />
      </Feature>
    </List>
  </Dialog>
);

LodgeActions.propTypes = {
  // eslint-disable-next-line
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default LodgeActions;
