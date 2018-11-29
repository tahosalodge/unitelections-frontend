/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';

// import createStore from 'state';
import App from './App';
import 'index.css';

// const store = createStore();

const theme = createMuiTheme({
  palette: {
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
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    {/* <Provider store={store}> */}
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
    {/* </Provider> */}
  </MuiPickersUtilsProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(<Root />, document.getElementById('root'));
  });
}
