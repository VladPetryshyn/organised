import {configureStore} from '@reduxjs/toolkit';
import directoryReducer from './directoryReducer';
import tasksReducer from './tasksReducer';
import themeReducer from './themeReducer';
import tagsReducer from './tagsReducer';

export const store = configureStore({
  reducer: {
    directoryReducer,
    tasksReducer,
    themeReducer,
    tagsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
