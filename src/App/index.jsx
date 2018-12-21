import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import Notifications from 'components/Notifications';
import { getAuth } from 'selectors/auth';
import authShape from 'shapes/auth';
import Routes from './Routes';
import styles from './styles';

class App extends React.Component {
  static propTypes = {
    auth: authShape.isRequired,
  };

  state = {
    open: false,
  };

  toggleDrawer = () => this.setState(prev => ({ open: !prev.open }));

  closeDrawer = () => this.setState({ open: false });

  render() {
    const { classes, auth } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Header
            classes={classes}
            open={open}
            handleOpen={this.toggleDrawer}
            auth={auth}
          />
          <Navigation
            classes={classes}
            open={open}
            handleClose={this.closeDrawer}
            auth={auth}
          />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <div className={classes.page}>
              <Routes auth={auth} />
            </div>
          </main>
          <Notifications />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: getAuth(state),
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(App);
