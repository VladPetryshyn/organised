import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Authorized} from './screens/Authorized';
import {Initialization} from './screens/Initialization';
import watcher from './native/watcher';
import {EmitterSubscription, NativeEventEmitter} from 'react-native';
import {StackParamList} from './screens/types';
import {useSelector} from './hooks/useSelector';
import {directorySelector, setDirectoryAC} from './redux/directoryReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from './hooks/useDispatch';
import {updateNotebooks, initializeTasks} from './redux/tasksReducer';
import {getFiles} from './utils/getFiles';
import ManageExternalStorage from './native/allFilesRequester';
import {LoadingIndicator} from './components/Loading';
import {getFile} from './utils/getFile';

const Stack = createStackNavigator<StackParamList>();

function App() {
  const directory = useSelector(directorySelector);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isAllFilesAccessPermitted, setIsAllFilesAccessPermitted] =
    useState<boolean>();

  useEffect(() => {
    const getData = async () => {
      const dir = await AsyncStorage.getItem('directory');
      ManageExternalStorage.checkPermission(setIsAllFilesAccessPermitted);

      if (dir && isAllFilesAccessPermitted) {
        dispatch(setDirectoryAC(dir));
        const {notesData} = await getFiles(dir);

        dispatch(initializeTasks(notesData));
      }

      if (isAllFilesAccessPermitted !== undefined) {
        setIsLoading(false);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllFilesAccessPermitted]);

  useEffect(() => {
    let eventListener: EmitterSubscription;
    if (directory) {
      watcher.startWatching(directory);
      const eventEmitter = new NativeEventEmitter(watcher);

      eventListener = eventEmitter.addListener('FileChanged', async event => {
        const name = event.name.replace('.org', '');
        const {notes} = await getFile(`${directory}/${name}.org`);
        const data = {[name]: notes};

        dispatch(updateNotebooks(data));
      });
    }
    return () => {
      if (eventListener) {
        eventListener.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directory]);

  return isLoading ? (
    <LoadingIndicator />
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
