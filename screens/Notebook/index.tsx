import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Appbar, Snackbar} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Container} from '../../components/Container';
import {CustomFAB} from '../../components/FAB';
import {NoteCardDefault} from '../../components/NoteCard';
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
import {DeleteDialog} from './DeleteDialog';

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
            <NoteCardDefault
              {...item}
              ids={[item?.properties?.id]}
              notebook={notebook}
              navigate={navigation.navigate}
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
        <Appbar style={styles.bottomAppbar} safeAreaInsets={{bottom}}>
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
              isCreating: true,
            })
          }
        />
      )}
      <DeleteDialog
        isDeleteModalVisible={isDeleteModalVisible}
        setIsDeleteModalVisible={setIsDeleteModalVisible}
        selectedNotes={selectedNotes}
        onDelete={onDelete}
      />
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
  bottomAppbar: {
    height: 50,
  },
});
