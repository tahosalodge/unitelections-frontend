import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';

import Table from 'components/Table';
import Page from 'components/Page';
import { listUsers, deleteUser } from 'state/modules/user';
import { listUnits } from 'state/modules/unit';
import { listElections } from 'state/modules/election';
import { selectUsers } from 'selectors/user';
import Actions from './Actions';
import Organization from './Organization';
import Edit from './Edit';

const styles = theme => ({
  table: {
    minWidth: 700,
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

class Users extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    listUsers: PropTypes.func.isRequired,
    listUnits: PropTypes.func.isRequired,
    listElections: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
  };

  state = {
    actions: '',
    editing: '',
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

  openEdit = editing =>
    this.setState({
      editing,
    });

  closeEdit = () =>
    this.setState({
      editing: '',
    });

  render() {
    const { actions, editing } = this.state;
    const { users } = this.props;
    return (
      <Page title="Users">
        <Edit userId={editing} handleClose={this.closeEdit} />
        <Actions
          userId={actions}
          onClose={this.closeActions}
          deleteUser={this.props.deleteUser}
          editUser={this.openEdit}
        />
        <Table data={users} columns={this.columns} />
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
