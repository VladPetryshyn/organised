import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './mainReducer';
import cloneDeep from 'lodash.clonedeep';

export interface tagsReducerStateI {
  notebooks: {
    [key: string]: {
      [key: string]: number;
    };
  };
  count: {
    [key: string]: number;
  };
}

interface changeTagsPayloadI {
  tagsData: tagsReducerStateI;
}

const initialState: tagsReducerStateI = {notebooks: {}, count: {}};

export const changeTags = createAsyncThunk(
  '',
  async (payload: changeTagsPayloadI, thunkAPI) => {
    const {dispatch} = thunkAPI;
    const {tagsData} = payload;

    dispatch(initializeTags(tagsData));
    await AsyncStorage.setItem('tags', JSON.stringify(tagsData));
  },
);

export const onFilesUpdateTags = createAsyncThunk(
  '',
  async (payload: tagsReducerStateI, thunkAPI) => {
    const {dispatch, getState} = thunkAPI;
    const {tagsReducer} = getState() as {tagsReducer: tagsReducerStateI};
    const newData = cloneDeep(tagsReducer);

    for (const notebook of Object.keys(payload.notebooks)) {
      const notebookData = newData.notebooks[notebook];
      if (!notebookData) {
        continue;
      }
      for (const tag of Object.keys(payload.notebooks[notebook])) {
        const payloadVal = payload.notebooks[notebook][tag];
        if (!isNaN(notebookData[tag])) {
          const newVal = payloadVal - notebookData[tag];
          notebookData[tag] = payloadVal;
          newData.count[tag] += newVal;
        } else {
          newData.count[tag] = payloadVal;
          notebookData[tag] = payloadVal;
        }
      }
      for (const tag of Object.keys(newData.notebooks[notebook])) {
        if (
          payload.notebooks[notebook][tag] &&
          newData.notebooks[notebook][tag]
        ) {
          continue;
        }
        if (
          newData.notebooks[notebook][tag] &&
          !payload.notebooks[notebook][tag]
        ) {
          newData.count[tag] -= newData.notebooks[notebook][tag];
          newData.notebooks[notebook][tag] = 0;
        }
      }
    }

    dispatch(initializeTags(newData));
    await AsyncStorage.setItem('tags', JSON.stringify(newData));
  },
);

const tagsSlice = createSlice({
  initialState,
  name: 'tagsSlice',
  reducers: {
    initializeTags: (_, action: PayloadAction<tagsReducerStateI>) => {
      return action.payload;
    },
  },
});

export const {initializeTags} = tagsSlice.actions;

export const tagsNameSelector = () => (state: RootState) =>
  Object.keys(state.tagsReducer.count);

export default tagsSlice.reducer;
