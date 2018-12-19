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
    margin: 'auto',
    maxWidth: theme.spacing.unit * 100,
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  },
  title: {
    textTransform: 'capitalize',
    marginBottom: theme.spacing.unit * 1,
  },
});

const Page = ({ children, classes, title }) => (
  <Paper className={classes.root}>
    {title && (
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
    )}
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
