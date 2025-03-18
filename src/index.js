import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { configureStore } from "@reduxjs/toolkit";
import { AuthProvider } from 'contexts/AuthContext';
import ContextProvider from 'contexts/ContextProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import rootReducer from 'store/index';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  }
});

const store = configureStore({
  reducer : rootReducer,
});

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <AuthProvider>
    <ContextProvider>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </ContextProvider>
    </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
