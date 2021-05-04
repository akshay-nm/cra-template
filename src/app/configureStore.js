/**
 * Redux store (Redux)
 * Description: Configure redux store (with persistence)
 * Original Author: Akshay Kumar <akshay.nm92@gmail.com>
 */

import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// slice reducers
import sessionReducer from './sessionSlice'
import notificationsReducer from './notificationsSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    session: sessionReducer,
    notifications: notificationsReducer,
  }),
)

const configure = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })
  const persistor = persistStore(store)
  return { store, persistor }
}

export default configure
