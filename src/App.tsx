import React from 'react';

import AppRoutes from './routes';
import GlobalStyle from './config/global';
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import { theme } from './config/theme';
import { persistor, store } from './store/store';
import { useAppSelector } from './store/hooks';

const Spinner = 0 // COLOCAR O SPINER P/ FICAR CARREGANDO QUANDO SALVAR NO STORAGE ------

function App() {
  //const useLoggedDarkMode = useAppSelector((state) => state.userLogged);

  const darkMode: boolean = false;

  return (
      <Provider store={store}>
        <PersistGate loading={Spinner} persistor={persistor}>
          <ThemeProvider theme={darkMode ? theme.dark : theme.light}>
            <AppRoutes />
            <GlobalStyle />
          </ThemeProvider>
        </PersistGate>
      </Provider> 
  );
};

export default App;
