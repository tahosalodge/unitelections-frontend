import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import classnames from 'classnames';

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
  fullwidth: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: '100%',
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  },
  squareTop: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  squareBottom: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  noShadow: {
    boxShadow: 'none',
  },
  title: {
    textTransform: 'capitalize',
    marginBottom: theme.spacing.unit * 1,
  },
});

const Page = ({
  children,
  classes,
  title,
  fullwidth,
  squareTop,
  squareBottom,
  noShadow,
  id,
}) => (
  <Paper
    id={id}
    className={classnames({
      [classes.fullwidth]: fullwidth,
      [classes.root]: !fullwidth,
      [classes.squareTop]: squareTop,
      [classes.squareBottom]: squareBottom,
      [classes.noShadow]: noShadow,
    })}
  >
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
  fullwidth: PropTypes.bool,
};

Page.defaultProps = {
  title: null,
  fullwidth: false,
};

export default withStyles(styles)(Page);
