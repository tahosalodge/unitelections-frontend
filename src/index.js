/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import createStore from 'state';
import App from './App';

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
});

const Root = () => (
  // <Provider store={store}>
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>
  // </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(<Root />, document.getElementById('root'));
  });
}
