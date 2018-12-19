import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from 'state/modules/auth';
import { Redirect } from '@reach/router';

class Logout extends React.Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <Redirect to="/" noThrow />;
  }
}

export default connect(
  null,
  { logout }
)(Logout);
