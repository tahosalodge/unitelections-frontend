import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserForm from 'forms/User';
import { updateUser } from 'state/modules/user';

const UserEdit = props => (
  <UserForm
    id="update-user"
    title="Update User"
    onSubmit={values => props.updateUser(props.userId, values)}
    {...props}
  />
);

UserEdit.propTypes = {
  updateUser: PropTypes.func.isRequired,
};

export default connect(
  null,
  { updateUser }
)(UserEdit);
