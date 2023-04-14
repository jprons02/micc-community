//https://blog.webdevsimplified.com/2022-07/react-folder-structure/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from './lib/notistack';
import { LoginProvider } from './context/loginContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <LoginProvider>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
    </LoginProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
