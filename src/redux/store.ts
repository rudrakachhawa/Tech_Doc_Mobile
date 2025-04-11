// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { userApi } from './services/apis/userApi';
import persistedReducer from './rootReducers';
import { collectionsApi } from './services/apis/collectionsApi';

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // ✅ prevents function warnings
        }).concat(
            userApi.middleware,
            collectionsApi.middleware
        ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
