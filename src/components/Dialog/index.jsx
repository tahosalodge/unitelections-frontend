import React from 'react';
import PropTypes from 'prop-types';
import MaterialDialog from '@material-ui/core/Dialog';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const Dialog = ({
  fullScreen,
  fullWidth,
  maxWidth,
  titleId,
  children,
  ...props
}) => (
  <MaterialDialog
    fullScreen={fullScreen}
    open
    fullWidth={fullWidth}
    maxWidth={maxWidth}
    aria-labelledby={titleId}
    {...props}
  >
    {children}
  </MaterialDialog>
);

Dialog.propTypes = {
  fullScreen: PropTypes.bool,
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.string,
  titleId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Dialog.defaultProps = {
  fullScreen: false,
  fullWidth: true,
  maxWidth: 'xs',
};

export default withMobileDialog()(Dialog);
