import React from 'react';
import { connect } from 'react-redux';
import UserForm from 'forms/User';
import { createUser } from 'state/modules/user';

const UserCreate = props => (
  <UserForm id="create-user" title="Create User" {...props} />
);
export default connect(
  null,
  { onSubmit: createUser }
)(UserCreate);
