import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Link } from '@reach/router';

import { Feature, IS_ADMIN } from 'utils/features';
import Confirm from 'components/Confirm';

const UnitActions = ({
  classes,
  onClose,
  selectedValue,
  unitId,
  deleteUnit,
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
        <ListItem button component={Link} to={`/units/${unitId}/edit`}>
          <ListItemText primary="Edit Unit" />
        </ListItem>
        <Feature name={IS_ADMIN}>
          <Confirm
            button
            onClick={() => deleteUnit(unitId)}
            text="Delete Unit"
          />
        </Feature>
      </List>
    </div>
  </Dialog>
);

UnitActions.propTypes = {
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  deleteUnit: PropTypes.func.isRequired,
};

export default UnitActions;
