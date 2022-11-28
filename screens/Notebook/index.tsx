import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Appbar, Button, Snackbar, Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Container} from '../../components/Container';
import {CustomFAB} from '../../components/FAB';
import {CustomModal} from '../../components/Modal';
import {NoteCard} from '../../components/NoteCard';
import {useDispatch} from '../../hooks/useDispatch';
import {useSelector} from '../../hooks/useSelector';
import {useToggle} from '../../hooks/useToggle';
import {
  checkNotes,
  deleteNotes,
  notebookSelector,
  undoAction,
} from '../../redux/tasksReducer';
import {NotesStackScreenP} from '../types';

const BOTTOM_APPBAR_HEIGHT = 50;

export const Notebook: FC<NotesStackScreenP<'Notebook'>> = ({
  navigation,
  route,
}) => {
  const {name: notebook} = route.params;
  const [selectedNotes, setSelectedNotes] = useState<Array<Array<string>>>([]);
  const dispatch = useDispatch();
  const {state: isDeleteModalVisible, toggle: setIsDeleteModalVisible} =
    useToggle();
  const {state: isSnackbarVisible, toggle: toggleSnackbarVisibility} =
    useToggle();
  const notes = useSelector(notebookSelector(route.params.name));
  const {bottom} = useSafeAreaInsets();
  const onDelete = () => {
    setIsDeleteModalVisible();
    dispatch(deleteNotes({notebook, idsArray: selectedNotes}));
    setSelectedNotes([]);
    toggleSnackbarVisibility();
  };
  const onUndo = () => {
    dispatch(undoAction({notebook}));
  };
  const onCheck = () => {
    dispatch(checkNotes({idsArray: selectedNotes, notebook}));
    setSelectedNotes([]);
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setSelectedNotes([]);
      };
    }, []),
  );
  return (
    <Container>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={navigation.openDrawer} />
        <Appbar.Content title={route.params.name} />
      </Appbar.Header>
      <FlatList
        data={notes}
        renderItem={({item}) => {
          return item ? (
            <NoteCard
              {...item}
              ids={[item?.properties?.id]}
              notebook={notebook}
              navigate={navigation.push}
              setSelectedNotes={setSelectedNotes}
              selectedNotes={selectedNotes}
            />
          ) : null;
        }}
        contentContainerStyle={styles.container}
        keyExtractor={item => item?.properties?.id}
        initialNumToRender={5}
      />
      {selectedNotes.length > 0 && (
        <Appbar
          style={[styles.bottomAppbar, {height: BOTTOM_APPBAR_HEIGHT}]}
          safeAreaInsets={{bottom}}>
          <Appbar.Content title="" />
          <Appbar.Action
            icon="delete-outline"
            onPress={setIsDeleteModalVisible}
          />
          <Appbar.Action icon="check-circle-outline" onPress={onCheck} />
          {selectedNotes.length === 1 && (
            <Appbar.Action
              icon="plus"
              onPress={() =>
                navigation.navigate('Note', {
                  notebook,
                  ids: selectedNotes[0],
                  isCreating: true,
                })
              }
            />
          )}
        </Appbar>
      )}
      {selectedNotes.length === 0 && (
        <CustomFAB
          icon="plus"
          onPress={() =>
            navigation.navigate('Note', {
              notebook,
            })
          }
        />
      )}
      <CustomModal
        visible={isDeleteModalVisible}
        onDismiss={setIsDeleteModalVisible}>
        <Text variant="headlineSmall">
          Are you sure that you want to delete {selectedNotes.length} notes?
        </Text>
        <View style={styles.modalButtons}>
          <Button
            mode="text"
            style={styles.modalCancel}
            onPress={setIsDeleteModalVisible}>
            Cancel
          </Button>
          <Button mode="text" style={styles.modalSubmit} onPress={onDelete}>
            OK
          </Button>
        </View>
      </CustomModal>
      <Snackbar
        visible={isSnackbarVisible}
        onDismiss={toggleSnackbarVisibility}
        action={{
          label: 'Undo',
          onPress: onUndo,
        }}>
        Hey there! I'm a Snackbar.
      </Snackbar>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 5,
  },
  bottomAppbar: {},
  modalButtons: {
    flexDirection: 'row',
  },
  modalSubmit: {
    marginLeft: 20,
    marginTop: 20,
  },
  modalCancel: {
    marginLeft: 'auto',
    marginTop: 20,
  },
});
