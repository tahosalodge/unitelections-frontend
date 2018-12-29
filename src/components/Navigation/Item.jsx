import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from 'App/styles';

const NavigationItem = ({ children, label, classes, ...props }) => (
  <ListItem button component={Link} className={classes.navItem} {...props}>
    <ListItemIcon className={classes.navIcon}>{children}</ListItemIcon>
    <ListItemText primary={label} />
  </ListItem>
);

NavigationItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(NavigationItem);
