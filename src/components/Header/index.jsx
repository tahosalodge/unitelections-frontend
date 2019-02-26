import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
// import NotificationsIcon from '@material-ui/icons/Notifications';

const Header = ({ classes, open, handleOpen, auth, id }) => (
  <AppBar id={id} position="absolute" className={classes.appBar}>
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
      {!auth.loggedIn && (
        <Button component={Link} to="/login" variant="contained">
          Log In
        </Button>
      )}
      {auth.loggedIn && (
        <Fragment>
          <Typography variant="subtitle1" color="inherit">
            {`${auth.user.fname} ${auth.user.lname}`}
          </Typography>
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
        </Fragment>
      )}
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  auth: PropTypes.shape({}).isRequired,
};

export default Header;
