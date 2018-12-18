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

import createStore from 'state';
import history from 'utils/history';
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

const Root = () => (
  <LocationProvider history={history}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Provider store={store}>
        <SnackbarProvider>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </MuiThemeProvider>
        </SnackbarProvider>
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
