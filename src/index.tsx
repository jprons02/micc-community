//https://blog.webdevsimplified.com/2022-07/react-folder-structure/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { BrowserRouter } from 'react-router-dom';

// Providers
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from './lib/notistack';
import { LoginProvider } from './context/loginContext';
import { UserProvider } from './context/userContext';
import { CalendarEventsProvider } from './context/calendarEvents';
import { TribalNoticesProvider } from './context/tribalNotices';
import { EmergencyNoticesProvider } from './context/emergencyNotices';

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={{}}>
          <LoginProvider>
            <UserProvider>
              <CalendarEventsProvider>
                <TribalNoticesProvider>
                  <EmergencyNoticesProvider>
                    <SnackbarProvider maxSnack={3}>
                      <App />
                    </SnackbarProvider>
                  </EmergencyNoticesProvider>
                </TribalNoticesProvider>
              </CalendarEventsProvider>
            </UserProvider>
          </LoginProvider>
        </ThemeProvider>
      </CacheProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
