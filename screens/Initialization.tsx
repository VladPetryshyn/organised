import React, {FC, useEffect, useRef, useState} from 'react';
import {Container} from '../components/Container';
import {StyleSheet, View, BackHandler, AppState} from 'react-native';
import {ActivityIndicator, Button, Portal, Text} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {checkPermissions, requestPermissions} from '../utils/askPermission';
import {StackScreenP} from './types';
import {useDispatch} from '../hooks/useDispatch';
import {changeDirectory} from '../utils/changeDirectory';
import {getHashes} from '../utils/getHashes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initializeTasks} from '../redux/tasksReducer';
import {getFiles} from '../utils/getFiles';
import {decodeUriToDir} from '../utils/decodeUriToDir';
import {changeTags, initializeTags} from '../redux/tagsReducer';
import {CustomModal} from '../components/Modal';
import allFilesAccessRequest from '../native/allFilesAccessRequest';
import {useToggle} from '../hooks/useToggle';

export const Initialization: FC<StackScreenP<'Initialization'>> = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const {state: isLoading, toggle: toggleIsLoading} = useToggle(false);
  const appState = useRef(AppState.currentState);
  const dispatch = useDispatch();
  const pick = async () => {
    const dir = decodeUriToDir((await DocumentPicker.pickDirectory())!.uri);

    toggleIsLoading();
    const hashes = await getHashes(dir);
    await AsyncStorage.setItem('hashes', JSON.stringify(hashes));

    const {notesData, tagsData} = await getFiles(dir);
    await AsyncStorage.setItem('notes', JSON.stringify(notesData));
    dispatch(initializeTasks(notesData));

    dispatch(changeTags({tagsData, action: initializeTags}));

    await changeDirectory(dispatch)(dir);
    toggleIsLoading();
  };

  useEffect(() => {
    const check = async () => {
      setIsModalVisible(!(await checkPermissions()));
    };
    check();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          setIsModalVisible(!(await requestPermissions()));
        }

        appState.current = nextAppState;
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const openSettings = async () => {
    allFilesAccessRequest.openAllFilesPermission();
  };
  return (
    <Container style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <>
          <Text variant="titleLarge" style={styles.text}>
            Please select folder with your org files.
          </Text>
          <Button mode="outlined" onPress={pick}>
            Select notes folder
          </Button>
          <Portal>
            <CustomModal
              visible={isModalVisible}
              contentContainerStyle={styles.modalContainer}>
              <Text variant="titleLarge">
                Organised can't work without storage access
              </Text>
              <View style={styles.modalButtons}>
                <Button
                  style={styles.modalCancel}
                  onPress={BackHandler.exitApp}>
                  Cancel
                </Button>
                <Button style={styles.modalButton} onPress={openSettings}>
                  OK
                </Button>
              </View>
            </CustomModal>
          </Portal>
        </>
      )}
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
  modalButton: {
    marginLeft: 10,
  },
  modalCancel: {
    marginLeft: 'auto',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 22,
  },
  modalContainer: {
    width: 400,
  },
});
