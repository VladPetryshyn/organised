import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './mainReducer';

export interface DirectoryState {
  directory: string;
}

const initialState: DirectoryState = {
  directory: '',
};

const directorySlice = createSlice({
  name: 'directory',
  initialState,
  reducers: {
    setDirectory: (state, action: PayloadAction<string>) => {
      state.directory = action.payload;
    },
  },
});

export const {setDirectory} = directorySlice.actions;

export const directorySelector = (state: RootState) =>
  state.directoryReducer.directory;

export default directorySlice.reducer;
