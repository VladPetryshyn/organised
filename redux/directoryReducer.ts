import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createListenerMiddleware,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {directoryAsyncStorageKey} from '../constants';
import {RootState} from './mainReducer';

export interface DirectoryState {
  directory: string;
}

const initialState: DirectoryState = {
  directory: '',
};

export const directoryListenerMiddleware = createListenerMiddleware();

const directorySlice = createSlice({
  name: 'directory',
  initialState,
  reducers: {
    setDirectoryAC: (state, action: PayloadAction<string>) => {
      state.directory = action.payload;
    },
  },
});

export const {setDirectoryAC} = directorySlice.actions;

export const directorySelector = (state: RootState) =>
  state.directoryReducer.directory;

directoryListenerMiddleware.startListening({
  actionCreator: setDirectoryAC,
  effect: async action => {
    console.log('payload', action.payload);
    await AsyncStorage.setItem(directoryAsyncStorageKey, action.payload);
  },
});

export default directorySlice.reducer;
