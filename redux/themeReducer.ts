import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './mainReducer';

const initialState = {
  isDark: false,
  primary: '#ff0000',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (_, action: PayloadAction<typeof initialState>) => {
      return action.payload;
    },
    toggleIsDarkTheme: state => {
      state.isDark = !state.isDark;
    },
  },
});

export const {changeTheme, toggleIsDarkTheme} = themeSlice.actions;

export const themeSelector = (state: RootState) => state.themeReducer;
export const isDarkSelector = (state: RootState) => state.themeReducer.isDark;

export default themeSlice.reducer;
