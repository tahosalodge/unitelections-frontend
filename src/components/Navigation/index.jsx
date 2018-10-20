import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AppsIcon from '@material-ui/icons/Apps';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import NavigationItem from './Item';

const Navigation = ({ classes, open, handleClose }) => (
  <Drawer
    variant="permanent"
    classes={{
      paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
    }}
    open={open}
  >
    <div className={classes.toolbarIcon}>
      <IconButton onClick={handleClose}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
    <Divider />
    <List>
      <NavigationItem to="/" label="Home">
        <AppsIcon />
      </NavigationItem>
      <NavigationItem to="/elections" label="Elections">
        <FingerprintIcon />
      </NavigationItem>
      <NavigationItem to="/elections/123" label="Election">
        <FingerprintIcon />
      </NavigationItem>
      <NavigationItem to="/elections/new" label="Create Election">
        <FingerprintIcon />
      </NavigationItem>
      <NavigationItem to="/units" label="Units">
        <FingerprintIcon />
      </NavigationItem>
      <NavigationItem to="/units/123" label="Unit">
        <FingerprintIcon />
      </NavigationItem>
      <NavigationItem to="/units/new" label="Create Unit">
        <FingerprintIcon />
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
