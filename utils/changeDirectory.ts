import AsyncStorage from '@react-native-async-storage/async-storage';
import {setDirectory} from '../redux/directoryReducer';
import {Dispatch} from '../redux/mainReducer';

export const changeDirectory = (dispatch: Dispatch) => async (uri: string) => {
  if (uri) {
    await AsyncStorage.setItem('directory', uri);
    dispatch(setDirectory(uri));
  }
};
