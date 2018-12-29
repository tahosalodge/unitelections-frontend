import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import GroupIcon from '@material-ui/icons/Group';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';

import authShape from 'shapes/auth';
import NavigationItem from './Item';

const Navigation = ({ classes, open, handleClose, auth }) => (
  <Drawer
    variant="permanent"
    classes={{
      paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
    }}
    open={open}
  >
    <List className={classes.list}>
      {auth.loggedIn ? (
        <Fragment>
          <NavigationItem
            to="/elections"
            label="Elections"
            onClick={handleClose}
          >
            <PersonAddIcon />
          </NavigationItem>
          <NavigationItem to="/units" label="Units" onClick={handleClose}>
            <GroupIcon />
          </NavigationItem>
          <NavigationItem to="/logout" label="Log Out" onClick={handleClose}>
            <LockIcon />
          </NavigationItem>
          {auth.user.isAdmin && (
            <Fragment>
              <NavigationItem
                to="/admin/users"
                label="Users"
                onClick={handleClose}
              >
                <GroupIcon />
              </NavigationItem>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <NavigationItem to="/login" label="Log In" onClick={handleClose}>
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
