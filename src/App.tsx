import React from 'react';

import { ThemeProvider } from 'styled-components';
import AppRoutes from './routes';
import GlobalStyle from './config/global';
import { theme } from './config/theme';
import { useAppSelector } from './store/hooks';

function App() {
  const useLoggedDarkMode = useAppSelector((state) => state.userLogged.darkMode);
  
  return (
    <ThemeProvider theme={useLoggedDarkMode ? theme.dark : theme.light}>
      <AppRoutes />
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
