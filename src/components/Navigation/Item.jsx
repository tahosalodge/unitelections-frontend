import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const NavigationItem = ({ to, children, label, onClick }) => (
  <ListItem button component={Link} to={to} onClick={onClick}>
    <ListItemIcon>{children}</ListItemIcon>
    <ListItemText primary={label} />
  </ListItem>
);

NavigationItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NavigationItem;
