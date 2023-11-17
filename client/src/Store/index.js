import {  combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import mainReducer from './Main/reducer';

const rootReducer = combineReducers({
  main: mainReducer,
});

const persistConfig = {
  timeout: 100,
  key: 'redux-Data',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  // ...other options if needed
});

