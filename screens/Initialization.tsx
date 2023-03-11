import React, {FC, useEffect, useState} from 'react';
import {Container} from '../components/Container';
import {StyleSheet, BackHandler} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  Text,
} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {StackScreenP} from './types';
import {useDispatch} from '../hooks/useDispatch';
import {initializeTasks} from '../redux/tasksReducer';
import {getFiles} from '../utils/getFiles';
import {decodeUriToDir} from '../utils/decodeUriToDir';
import {useToggle} from '../hooks/useToggle';
import {setDirectoryAC} from '../redux/directoryReducer';
import ManageExternalStorage from '../native/allFilesRequester';
import {LoadingIndicator} from '../components/Loading';
import {useTranslation} from 'react-i18next';

export const Initialization: FC<StackScreenP<'Initialization'>> = () => {
  // hooks
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {state: isLoading, toggle: toggleIsLoading} = useToggle(false);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  // functions
  const pick = async () => {
    const dir = decodeUriToDir(
      (await DocumentPicker.pickDirectory())?.uri ?? '',
    );
    if (dir) {
      toggleIsLoading();
      const {notesData} = await getFiles(dir);
      dispatch(initializeTasks(notesData));

      dispatch(setDirectoryAC(dir));
      toggleIsLoading();
    }
  };
  const allowAllFilesAccess = () => {
    ManageExternalStorage.checkAndGrantPermission(
      _ => {},
      _ => {},
    );
    ManageExternalStorage.checkPermission(res => setIsModalVisible(res));
  };

  // effects
  useEffect(() => {
    ManageExternalStorage.checkPermission(res => setIsModalVisible(!res));
  }, []);

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <Container style={styles.container}>
      <Text variant="titleLarge" style={styles.text}>
        {t('select_folder')}
      </Text>
      <Button mode="outlined" onPress={pick}>
        {t('select_folder_btn')}
      </Button>
      <Portal>
        <Dialog visible={isModalVisible}>
          <Dialog.Title>{t('storage_access')}</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={BackHandler.exitApp}>{t('cancel')}</Button>
            <Button onPress={allowAllFilesAccess}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  text: {
    marginTop: 15,
    marginBottom: 25,
    textAlign: 'center',
  },
});
