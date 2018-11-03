import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const Page = ({ children, classes, title }) => (
  <Paper className={classes.root}>
    {title && <Typography variant="h4">{title}</Typography>}
    <Fragment>{children}</Fragment>
  </Paper>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string,
};

Page.defaultProps = {
  title: null,
};

export default withStyles(styles)(Page);
