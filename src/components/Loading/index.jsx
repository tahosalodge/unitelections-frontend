import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = ({ loading, children }) =>
  loading ? <CircularProgress /> : children;

Loading.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Loading;
