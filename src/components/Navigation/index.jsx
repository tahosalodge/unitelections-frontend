import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import GroupIcon from '@material-ui/icons/Group';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';

import NavigationItem from './Item';
import authShape from '../../shapes/auth';

const Navigation = ({ classes, open, handleClose, auth }) => (
  <Drawer
    variant="permanent"
    classes={{
      paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
    }}
    open={open}
  >
    <List className={classes.list}>
      <NavigationItem
        className={classes.navItem}
        to="/elections"
        label="Elections"
        onClick={handleClose}
      >
        <PersonAddIcon />
      </NavigationItem>
      <NavigationItem
        className={classes.navItem}
        to="/units"
        label="Units"
        onClick={handleClose}
      >
        <GroupIcon />
      </NavigationItem>
      {auth.loggedIn ? (
        <NavigationItem
          className={classes.navItem}
          to="/logout"
          label="Log Out"
          onClick={handleClose}
        >
          <LockIcon />
        </NavigationItem>
      ) : (
        <NavigationItem
          className={classes.navItem}
          to="/login"
          label="Log In"
          onClick={handleClose}
        >
          <LockIcon />
        </NavigationItem>
      )}
    </List>
  </Drawer>
);

Navigation.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  auth: authShape.isRequired,
};

export default Navigation;
