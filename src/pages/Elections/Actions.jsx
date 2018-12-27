import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import { Link } from '@reach/router';

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

const ElectionActions = ({
  classes,
  onClose,
  selectedValue,
  electionId,
  ...other
}) => (
  <Dialog
    onClose={onClose}
    aria-labelledby="election-actions-title"
    open={!!electionId || false}
    {...other}
  >
    <DialogTitle id="election-actions-title">Election Actions</DialogTitle>
    <div>
      <List>
        <ListItem button component={Link} to={`/elections/${electionId}`}>
          <ListItemText primary="Details" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to={`/elections/${electionId}/schedule`}
        >
          <ListItemText primary="Schedule" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Edit Election" />
        </ListItem>
      </List>
    </div>
  </Dialog>
);

ElectionActions.propTypes = {
  onClose: PropTypes.func.isRequired,
  electionId: PropTypes.string.isRequired,
};

export default withStyles(styles)(ElectionActions);
