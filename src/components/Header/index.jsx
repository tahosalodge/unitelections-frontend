import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

const Header = ({ classes, open, handleOpen }) => (
  <AppBar position="absolute" className={classNames(classes.appBar)}>
    <Toolbar disableGutters={!open} className={classes.toolbar}>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={handleOpen}
        className={classNames(classes.menuButton)}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" color="inherit" noWrap className={classes.title}>
        Tahosa Lodge Elections
      </Typography>
      {/* {auth.loggedIn && (
        <Fragment>
          <Typography variant="subtitle1" color="inherit">
            {`Welcome ${auth.user.fname}`}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Fragment>
      )} */}
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  // auth: PropTypes.shape({}).isRequired,
};

export default Header;
