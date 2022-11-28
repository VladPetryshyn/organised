import React, {FC, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Appbar, Button, Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Container} from '../../components/Container';
import {CustomFAB} from '../../components/FAB';
import {CustomModal} from '../../components/Modal';
import {useDispatch} from '../../hooks/useDispatch';
import {useSelector} from '../../hooks/useSelector';
import {useToggle} from '../../hooks/useToggle';
import {deleteNotebook, keysSelector} from '../../redux/tasksReducer';
import {NotesStackScreenP} from '../types';
import {AddNoteModal} from './AddNoteModal';
import {NotebookCard} from './NotebookCard';

const BOTTOM_APPBAR_HEIGHT = 50;

export const Notes: FC<NotesStackScreenP<'Notebooks'>> = ({navigation}) => {
  const keys = useSelector(keysSelector);
  const dispatch = useDispatch();
  const [selectedNotebooks, setSelectedNotebooks] = useState<Array<string>>([]);
  const {state: isVisible, toggle: toggleIsVisible} = useToggle(false);
  const {state: isModalVisible, toggle: toggleIsModalVisible} =
    useToggle(false);
  const {bottom} = useSafeAreaInsets();

  const deleteNotebooks = () => {
    for (const notebook of selectedNotebooks) {
      dispatch(deleteNotebook({notebook}));
    }
    toggleIsModalVisible();
  };

  return (
    <Container>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={navigation.openDrawer} />
        <Appbar.Content title="Notebooks" />
      </Appbar.Header>
      <FlatList
        data={keys}
        contentContainerStyle={styles.container}
        renderItem={({item}) => (
          <NotebookCard
            name={item}
            navigation={navigation}
            selectedNotebooks={selectedNotebooks}
            setSelectedNotebooks={setSelectedNotebooks}
          />
        )}
      />
      <AddNoteModal isVisible={isVisible} toggleIsVisible={toggleIsVisible} />
      {selectedNotebooks.length > 0 && (
        <Appbar
          style={[styles.bottomAppbar, {height: BOTTOM_APPBAR_HEIGHT}]}
          safeAreaInsets={{bottom}}>
          <Appbar.Content title="" />
          <Appbar.Action icon="delete-outline" onPress={toggleIsModalVisible} />
        </Appbar>
      )}
      {selectedNotebooks.length === 0 && (
        <CustomFAB
          icon="plus"
          onPress={toggleIsVisible}
          navigation={navigation}
          selectedNotebooks={selectedNotebooks}
          setSelectedNotebooks={setSelectedNotebooks}
        />
      )}
      <CustomModal visible={isModalVisible} onDismiss={toggleIsModalVisible}>
        <Text variant="headlineSmall">
          Are you sure that you want to delete {selectedNotebooks.length}{' '}
          notebooks?
        </Text>
        <View style={styles.modalButtons}>
          <Button
            mode="text"
            style={styles.modalCancel}
            onPress={toggleIsModalVisible}>
            Cancel
          </Button>
          <Button
            mode="text"
            style={styles.modalSubmit}
            onPress={deleteNotebooks}>
            OK
          </Button>
        </View>
      </CustomModal>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 20,
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
