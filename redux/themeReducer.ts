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
  },
});

export const {changeTheme} = themeSlice.actions;

export const themeSelector = (state: RootState) => state.themeReducer;

export default themeSlice.reducer;
