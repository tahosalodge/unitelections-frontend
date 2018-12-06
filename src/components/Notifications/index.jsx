import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { removeNotification } from 'state/modules/notification';

class Notifier extends Component {
  state = {
    displayed: [],
  };

  storeDisplayed = key => {
    this.setState(({ displayed }) => ({
      displayed: [...displayed, key],
    }));
  };

  render() {
    const {
      notifications,
      enqueueSnackbar: enqueueNotification,
      removeNotification,
    } = this.props;
    const { displayed } = this.state;

    notifications.forEach(notification => {
      setTimeout(() => {
        // If notification already displayed, abort
        if (displayed.indexOf(notification.key) > -1) return;
        // Display notification using notistack
        enqueueNotification(notification.message, notification.options);
        // Add notification's key to the local state
        this.storeDisplayed(notification.key);
        // Dispatch action to remove the notification from the redux store
        removeNotification(notification.key);
      }, 1);
    });

    return null;
  }
}

const mapStateToProps = store => ({
  notifications: store.notification.notifications,
});

export default connect(
  mapStateToProps,
  { removeNotification }
)(withSnackbar(Notifier));
