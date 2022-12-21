import React from 'react';

import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import AppRoutes from './routes';
import GlobalStyle from './config/global';
import Progress from './components/Progress';
import { theme } from './config/theme';
import { persistor, store } from './store/store';
import { useAppSelector } from './store/hooks';

function App() {
  //const useLoggedDarkMode = useAppSelector((state) => state.userLogged);

  const darkMode: boolean = false;

  return (
      <Provider store={store}>
        <PersistGate loading={<Progress/>} persistor={persistor}>
          <ThemeProvider theme={darkMode ? theme.dark : theme.light}>
            <AppRoutes />
            <GlobalStyle />
          </ThemeProvider>
        </PersistGate>
      </Provider> 
  );
};

export default App;
