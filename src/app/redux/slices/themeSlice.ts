import { createSlice } from '@reduxjs/toolkit';

import { ThemeState } from '../../../types';
import { RootState } from '../store';

const initialState:ThemeState = {
  currentTheme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, {payload}) {
      state.currentTheme = payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;

export const currentTheme = (state: RootState) => state.theme.currentTheme;