import React, { Fragment } from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import Notifications from 'components/Notifications';
import Routes from './Routes';
import styles from './styles';

class App extends React.Component {
  state = {
    open: false,
  };

  toggleDrawer = () => this.setState(prev => ({ open: !prev.open }));

  closeDrawer = () => this.setState({ open: false });

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Header
            classes={classes}
            open={open}
            handleOpen={this.toggleDrawer}
          />
          <Navigation
            classes={classes}
            open={open}
            handleClose={this.closeDrawer}
          />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <div className={classes.page}>
              <Routes />
            </div>
          </main>
          <Notifications />
        </div>
      </Fragment>
    );
  }
}

export default compose(withStyles(styles))(App);
