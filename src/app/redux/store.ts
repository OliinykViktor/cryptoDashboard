import { configureStore } from '@reduxjs/toolkit';

import marketsReducer from './slices/marketsSlice';
import themeSlice from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    markets: marketsReducer,
    theme: themeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
