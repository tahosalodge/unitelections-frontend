/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { LocationProvider } from '@reach/router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import { SnackbarProvider } from 'notistack';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';

import createStore from 'state';
import history from 'utils/history';
import { ConnectedFeatureProvider } from 'utils/features';
import ErrorBoundary from 'components/ErrorBoundary';
import App from './App';

import 'index.css';

const store = createStore();

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: '#E31837',
    },
    secondary: {
      main: '#005596',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

ReactGA.initialize(process.env.REACT_APP_ANALYTICS);
history.listen(({ location }) => ReactGA.pageview(location.pathname));

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

const Root = () => (
  <LocationProvider history={history}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Provider store={store}>
        <ConnectedFeatureProvider>
          <SnackbarProvider>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            </MuiThemeProvider>
          </SnackbarProvider>
        </ConnectedFeatureProvider>
      </Provider>
    </MuiPickersUtilsProvider>
  </LocationProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(<Root />, document.getElementById('root'));
  });
}
