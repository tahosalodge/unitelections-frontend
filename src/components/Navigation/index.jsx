import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import AppsIcon from '@material-ui/icons/Apps';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import NavigationItem from './Item';

const Navigation = ({ classes, open }) => (
  <Drawer
    variant="permanent"
    classes={{
      paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
    }}
    open={open}
  >
    <List className={classes.list}>
      <NavigationItem className={classes.navItem} to="/" label="Home">
        <AppsIcon />
      </NavigationItem>
      <NavigationItem
        className={classes.navItem}
        to="/elections"
        label="Elections"
      >
        <FingerprintIcon />
      </NavigationItem>
      <NavigationItem
        className={classes.navItem}
        to="/elections/123"
        label="Election"
      >
        <FingerprintIcon />
      </NavigationItem>
      <NavigationItem
        className={classes.navItem}
        to="/elections/new"
        label="Create Election"
      >
        <FingerprintIcon />
      </NavigationItem>
      <NavigationItem className={classes.navItem} to="/units" label="Units">
        <FingerprintIcon />
      </NavigationItem>
      <NavigationItem className={classes.navItem} to="/units/123" label="Unit">
        <FingerprintIcon />
      </NavigationItem>
      <NavigationItem
        className={classes.navItem}
        to="/units/new"
        label="Create Unit"
      >
        <FingerprintIcon />
      </NavigationItem>
    </List>
  </Drawer>
);

Navigation.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired,
};

export default Navigation;
