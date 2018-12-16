import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import GroupIcon from '@material-ui/icons/Group';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import NavigationItem from './Item';

const Navigation = ({ classes, open, handleClose }) => (
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
    </List>
  </Drawer>
);

Navigation.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Navigation;
