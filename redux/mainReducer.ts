import {configureStore} from '@reduxjs/toolkit';
import directoryReducer, {
  directoryListenerMiddleware,
} from './directoryReducer';
import tasksReducer from './tasksReducer';
import themeReducer, {themeListenerMiddleware} from './themeReducer';

export const store = configureStore({
  reducer: {
    directoryReducer,
    tasksReducer,
    themeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(themeListenerMiddleware.middleware)
      .prepend(directoryListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
