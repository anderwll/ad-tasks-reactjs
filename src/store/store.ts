import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './modules/rootReducer';

const persistConfig = {
    key: 'app',
    whitelist: ['users', 'userLogged'],
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer); 

const store = configureStore({
    reducer: persistedReducer
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch