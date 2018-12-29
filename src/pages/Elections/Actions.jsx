import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import Confirm from 'components/Confirm';
import { SCHEDULE_ELECTIONS, IS_ADMIN, Feature } from 'utils/features';

const ElectionActions = ({
  classes,
  onClose,
  selectedValue,
  electionId,
  deleteElection,
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
        <Feature name={SCHEDULE_ELECTIONS}>
          <ListItem
            button
            component={Link}
            to={`/elections/${electionId}/schedule`}
          >
            <ListItemText primary="Schedule" />
          </ListItem>
        </Feature>
        <ListItem button>
          <ListItemText primary="Edit Election" />
        </ListItem>
        <Feature name={IS_ADMIN}>
          <Confirm button onClick={deleteElection} text="Delete Election" />
        </Feature>
      </List>
    </div>
  </Dialog>
);

ElectionActions.propTypes = {
  onClose: PropTypes.func.isRequired,
  electionId: PropTypes.string.isRequired,
};

export default ElectionActions;
