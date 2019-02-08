import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import CustomCell from './Cell';

const styles = () => ({
  table: {
    minWidth: 700,
  },
  wrapper: {
    maxWidth: '100%',
    overflowX: 'scroll',
  },
});

const CustomTable = ({ classes, data, columns }) => (
  <div className={classes.wrapper}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell key={column.title}>{column.title}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.length > 0 ? (
          data.map(row => (
            <TableRow key={row._id}>
              {columns.map(column => (
                <CustomCell
                  key={`${row._id}-${column.title}`}
                  column={column}
                  row={row}
                />
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell>There's nothing to show here.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
);

CustomTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
      Cell: PropTypes.func,
    })
  ).isRequired,
  // eslint-disable-next-line
  data: PropTypes.any,
};

export default withStyles(styles)(CustomTable);
