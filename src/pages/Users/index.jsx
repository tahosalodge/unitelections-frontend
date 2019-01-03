import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import FloatingActionButton from '@material-ui/core/Fab';

import Table from 'components/Table';
import Page from 'components/Page';
import { listUsers, deleteUser } from 'state/modules/user';
import { listUnits } from 'state/modules/unit';
import { listElections } from 'state/modules/election';
import { selectUsers } from 'selectors/user';
import Actions from './Actions';
import Organization from './Organization';

const styles = theme => ({
  table: {
    minWidth: 700,
  },
  chip: {
    margin: theme.spacing.unit,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 10,
    right: theme.spacing.unit * 2,
  },
});

class Users extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    listUsers: PropTypes.func.isRequired,
    listUnits: PropTypes.func.isRequired,
    listElections: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  state = {
    actions: '',
  };

  columns = [
    {
      title: 'Name',
      render: ({ fname, lname }) => `${fname} ${lname}`,
    },
    {
      title: 'Email',
      accessor: 'email',
    },
    {
      title: 'Belongs To',
      render: ({ belongsTo }) => (
        <Fragment>
          {belongsTo.map(organization => (
            <Organization
              key={organization.organization}
              organization={organization}
              className={this.props.classes.chip}
            />
          ))}
        </Fragment>
      ),
    },
    {
      title: 'Status',
      accessor: 'status',
    },
    {
      title: '',
      render: ({ _id }) => (
        <IconButton onClick={() => this.openActions(_id)}>
          <MoreIcon />
        </IconButton>
      ),
    },
  ];

  componentDidMount() {
    this.props.listUsers();
    this.props.listUnits();
    this.props.listElections();
  }

  openActions = actions => this.setState({ actions });

  closeActions = () => this.setState({ actions: '' });

  render() {
    const { actions } = this.state;
    const { users, classes, children } = this.props;
    return (
      <Page title="Users" fullwidth>
        <Actions
          userId={actions}
          onClose={this.closeActions}
          deleteUser={this.props.deleteUser}
        />
        <Table data={users} columns={this.columns} />
        <FloatingActionButton
          className={classes.fab}
          color="secondary"
          component={Link}
          to="new"
        >
          <AddIcon />
        </FloatingActionButton>
        {children}
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  users: selectUsers(state),
});

export default compose(
  connect(
    mapStateToProps,
    { listUsers, deleteUser, listElections, listUnits }
  ),
  withStyles(styles)
)(Users);
