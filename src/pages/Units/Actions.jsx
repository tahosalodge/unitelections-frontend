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

const UnitActions = ({
  classes,
  onClose,
  selectedValue,
  unitId,
  deleteLodge,
  ...other
}) => (
  <Dialog
    onClose={onClose}
    aria-labelledby="unit-actions-title"
    open={!!unitId || false}
    {...other}
  >
    <DialogTitle id="unit-actions-title">Unit Actions</DialogTitle>
    <div>
      <List>
        <ListItem
          button
          component={Link}
          to={`/units/${unitId}/request-election`}
        >
          <ListItemText primary="Request Election" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to={`/units/${unitId}/schedule-election`}
        >
          <ListItemText primary="Schedule Election" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Edit Unit" />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary="Delete Unit"
            onClick={() => deleteLodge(unitId)}
          />
        </ListItem>
      </List>
    </div>
  </Dialog>
);

UnitActions.propTypes = {
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default withStyles(styles)(UnitActions);
