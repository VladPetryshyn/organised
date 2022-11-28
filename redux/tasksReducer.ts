import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActionCreatorWithPayload,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {jsonToOrg, Note, Notes} from 'org2json';
import {getHashes} from '../utils/getHashes';
import {indexOf} from '../utils/indexOf';
import {DirectoryState} from './directoryReducer';
import {RootState} from './mainReducer';
import cloneDeep from 'lodash.clonedeep';
import RNFetchBlob from 'rn-fetch-blob';

interface tasksReducerData {
  [notebook: string]: Notes;
}

interface initialState {
  data: tasksReducerData;
  history: Array<tasksReducerData>;
}

interface changeNotePayload {
  data: tasksReducerData;
  action: ActionCreatorWithPayload<any, string>;
}

interface getStateDataI {
  tasksReducer: initialState;
  directoryReducer: DirectoryState;
}

export const changeNote = createAsyncThunk(
  '',
  async (payload: changeNotePayload, thunkAPI) => {
    const {dispatch, getState} = thunkAPI;
    const {
      tasksReducer,
      directoryReducer: {directory},
    } = getState() as getStateDataI;
    const {action, data} = payload;

    await AsyncStorage.setItem(
      'notes',
      JSON.stringify({...tasksReducer.data, ...data}),
    );
    await AsyncStorage.setItem(
      'hashes',
      JSON.stringify(await getHashes(directory)),
    );
    dispatch(action(data));
  },
);

export const deleteNotebook = createAsyncThunk(
  '',
  async (payload: {notebook: string}, thunkAPI) => {
    const {notebook} = payload;
    const {getState, dispatch} = thunkAPI;
    const {directoryReducer} = getState() as getStateDataI;

    await RNFetchBlob.fs.unlink(
      `${directoryReducer.directory}/${notebook}.org`,
    );
    dispatch(deleteNotebookAC(payload));
  },
);
export const deleteNotes = createAsyncThunk(
  '',
  async (
    payload: {notebook: string; idsArray: Array<Array<string>>},
    thunkAPI,
  ) => {
    const {getState, dispatch} = thunkAPI;
    const {
      tasksReducer,
      directoryReducer: {directory},
    } = getState() as getStateDataI;
    const {notebook, idsArray} = payload;
    const clonedData = {items: cloneDeep(tasksReducer.data[notebook])};

    function remove(it: Note, ids: Array<string>) {
      if (ids.length === 1) {
        const id = ids.shift();
        it.items = it.items.filter(t => t.properties.id !== id);
        return it;
      }

      const id = ids.shift();
      it.items = it.items.filter(t =>
        t.properties.id === id ? remove(t, ids) : true,
      );

      return it;
    }

    for (const ids of idsArray) {
      remove(clonedData, ids);
    }

    dispatch(deleteNotesAC({notebook, data: clonedData.items}));
    await RNFetchBlob.fs.writeFile(
      `${directory}/${notebook}.org`,
      jsonToOrg(clonedData.items),
    );
  },
);

export const checkNotes = createAsyncThunk(
  '',
  async (
    payload: {notebook: string; idsArray: Array<Array<string>>},
    thunkAPI,
  ) => {
    const {getState, dispatch} = thunkAPI;
    const {tasksReducer} = getState() as getStateDataI;
    const {notebook, idsArray} = payload;
    const newNotebook = {items: tasksReducer.data[notebook]};

    idsArray.forEach(ids => {
      const checker = (note: Note) => {
        if (ids.length === 1) {
          const id = ids.shift();
          note.items = note.items.map(n =>
            n.properties.id === id
              ? {
                  ...n,
                  state: n.state === 'TODO' || n.state === '' ? 'DONE' : 'TODO',
                }
              : n,
          );
          return note;
        }

        const id = ids.shift();
        note.items = note.items.map(n =>
          n.properties.id === id ? checker(n) : n,
        );

        return note;
      };
      checker(newNotebook);
    });

    dispatch(removeTask({name: notebook, notes: newNotebook.items}));
  },
);

export const undoAction = createAsyncThunk(
  '',
  async (payload: {notebook: string}, thunkAPI) => {
    const {getState, dispatch} = thunkAPI;
    const {
      tasksReducer,
      directoryReducer: {directory},
    } = getState() as getStateDataI;

    await RNFetchBlob.fs.writeFile(
      `${directory}/${payload.notebook}.org`,
      jsonToOrg(tasksReducer.history[0][payload.notebook]),
    );

    dispatch(undoActionAC());
  },
);

const initialState: initialState = {data: {}, history: []};

interface Payload {
  name: keyof tasksReducerData;
}

interface addTaskPayloadI extends Payload {
  note: Note;
}
interface removeTaskPayloadI extends Payload {
  notes: Notes;
}
interface noteSelectorPayload {
  notebook: string;
  ids: string[];
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<addTaskPayloadI>) => {
      const {name, note} = action.payload;
      state.data[name] = [...state.data[name], note];
    },
    removeTask: (state, action: PayloadAction<removeTaskPayloadI>) => {
      const {name, notes} = action.payload;
      state.data[name] = notes;
    },
    initializeTasks: (_, action: PayloadAction<tasksReducerData>) => {
      return {data: action.payload, history: []};
    },
    addNotebook: (state, action: PayloadAction<string>) => {
      state.data[action.payload] = [];
    },
    updateNotebooks: (state, action: PayloadAction<tasksReducerData>) => {
      Object.keys(action.payload).forEach(key => {
        state.data[key] = action.payload[key];
      });
    },
    deleteNotesAC: (
      state,
      action: PayloadAction<{notebook: string; data: Array<Note>}>,
    ) => {
      state.history = [cloneDeep(state.data)];
      const {notebook, data} = action.payload;

      state.data[notebook] = data;
    },
    deleteNotebookAC: (state, action: PayloadAction<{notebook: string}>) => {
      const {notebook} = action.payload;
      delete state.data[notebook];
    },
    undoActionAC: state => {
      const item = state.history[0];
      state.data = item;
    },
    addNote: (
      state,
      action: PayloadAction<{notebook: string; newNotebook: Notes}>,
    ) => {
      const {notebook, newNotebook} = action.payload;
      state.data[notebook] = newNotebook;
    },
  },
});

export const {
  addTask,
  removeTask,
  initializeTasks,
  addNotebook,
  updateNotebooks,
  addNote,
  deleteNotesAC,
  undoActionAC,
  deleteNotebookAC,
} = tasksSlice.actions;

export const notebookSelector = (notebook: string) => (state: RootState) =>
  state.tasksReducer.data[notebook];

export const keysSelector = (state: RootState) =>
  Object.keys(state.tasksReducer.data);

export const noteSelector =
  (payload: noteSelectorPayload | undefined) => (state: RootState) => {
    if (!payload) {
      return;
    }
    const {notebook, ids} = payload;
    let items = state.tasksReducer.data[notebook];
    let lastItem: Note | null = null;

    for (const currId of ids) {
      const newItem = items.find(it => it.properties.id === currId);
      if (newItem) {
        items = newItem.items;
        lastItem = newItem;
      }
    }

    return lastItem;
  };

export default tasksSlice.reducer;
