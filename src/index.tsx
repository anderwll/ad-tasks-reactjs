import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/store';
import Progress from './components/Progress';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={<Progress/>} persistor={persistor}>
          <App />
        </PersistGate>
    </Provider> 
  </React.StrictMode>
);

