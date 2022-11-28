import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Authorized} from './screens/Authorized';
import {Initialization} from './screens/Initialization';
import watcher from './native/watcher';
import {EmitterSubscription, NativeEventEmitter} from 'react-native';
import {StackParamList} from './screens/types';
import {useSelector} from './hooks/useSelector';
import {directorySelector, setDirectory} from './redux/directoryReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from './hooks/useDispatch';
import {getHashes} from './utils/getHashes';
import {getUpdatedData} from './utils/getUpdatedData';
import {
  updateNotebooks,
  initializeTasks,
  changeNote,
} from './redux/tasksReducer';
import {ActivityIndicator, Text} from 'react-native-paper';
import {getFile} from './utils/getFile';
import {
  changeTags,
  initializeTags,
  onFilesUpdateTags,
} from './redux/tagsReducer';
import {LogBox} from 'react-native';
import {checkPermissions} from './utils/askPermission';

LogBox.ignoreLogs(['react-i18next', "Looks like you're", 'Require cycle']);

const Stack = createStackNavigator<StackParamList>();

function App() {
  const directory = useSelector(directorySelector);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const dir = await AsyncStorage.getItem('directory');
      const oldHashes = JSON.parse(
        (await AsyncStorage.getItem('hashes')) ?? '{}',
      );
      const notebooksData = JSON.parse(
        (await AsyncStorage.getItem('notes')) ?? '{}',
      );
      const oldTagsData = JSON.parse(
        (await AsyncStorage.getItem('tags')) ?? '{}',
      );
      if (dir && (await checkPermissions())) {
        dispatch(setDirectory(dir));
        const newHashes = await getHashes(dir);

        dispatch(initializeTasks(notebooksData));
        const filtredHashes = Object.keys(newHashes).filter(
          notebook => oldHashes[notebook] !== newHashes[notebook],
        );
        dispatch(initializeTags(oldTagsData));

        if (filtredHashes.length > 0) {
          const {noteData, tagsData} = await getUpdatedData(dir, filtredHashes);
          dispatch(onFilesUpdateTags(tagsData));
          dispatch(changeNote({data: noteData, action: updateNotebooks}));
        }
      }

      setIsLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    let eventListener: EmitterSubscription;
    if (directory) {
      watcher.startWatching(directory);
      const eventEmitter = new NativeEventEmitter(watcher);

      eventListener = eventEmitter.addListener('FileChanged', async event => {
        const name = event.name.replace('.org', '');
        const {notes, tags} = await getFile(`${directory}/${name}.org`);
        const data = {[name]: notes};

        dispatch(onFilesUpdateTags({notebooks: {[name]: tags}, count: {}}));
        dispatch(changeNote({data, action: updateNotebooks}));
      });
    }
    return () => {
      if (eventListener) {
        eventListener.remove();
      }
    };
  }, [directory]);

  return isLoading ? (
    <ActivityIndicator animating={true} size="large" />
  ) : (
    <Stack.Navigator
      initialRouteName="Initialization"
      screenOptions={{
        headerShown: false,
      }}>
      {directory ? (
        <Stack.Screen name="Authorized" component={Authorized} />
      ) : (
        <Stack.Screen name="Initialization" component={Initialization} />
      )}
    </Stack.Navigator>
  );
}

export default App;
