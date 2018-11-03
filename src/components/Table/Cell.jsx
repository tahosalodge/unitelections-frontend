import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import get from 'lodash/get';

const Cell = ({ row, column: { accessor, render } }) => {
  if (accessor) {
    return <TableCell>{get(row, accessor)}</TableCell>;
  }
  return <TableCell>{render(row)}</TableCell>;
};

Cell.propTypes = {
  // eslint-disable-next-line
  row: PropTypes.any.isRequired,
  column: PropTypes.shape({
    accessor: PropTypes.string,
    render: PropTypes.func,
  }).isRequired,
};

export default Cell;
