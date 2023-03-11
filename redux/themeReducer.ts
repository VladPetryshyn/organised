import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createListenerMiddleware,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {isDarkAsyncStorageKey, primaryColorAsyncStorageKey} from '../constants';
import {RootState} from './mainReducer';

const initialState = {
  isDark: false,
  primary: '#ff0000',
};

export const themeListenerMiddleware = createListenerMiddleware();

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeThemePrimaryColor: (state, action: PayloadAction<string>) => {
      state.primary = action.payload;
    },
    setIsDarkTheme: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
    },
  },
});

export const {changeThemePrimaryColor, setIsDarkTheme} = themeSlice.actions;

export const themeSelector = (state: RootState) => state.themeReducer;
export const isDarkSelector = (state: RootState) => state.themeReducer.isDark;

export default themeSlice.reducer;

themeListenerMiddleware.startListening({
  actionCreator: setIsDarkTheme,
  effect: async action => {
    await AsyncStorage.setItem(isDarkAsyncStorageKey, String(action.payload));
  },
});

themeListenerMiddleware.startListening({
  actionCreator: changeThemePrimaryColor,
  effect: async action => {
    await AsyncStorage.setItem(primaryColorAsyncStorageKey, action.payload);
  },
});
