import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Container} from '../../components/Container';
import {CustomFAB} from '../../components/FAB';
import {useDispatch} from '../../hooks/useDispatch';
import {useSelector} from '../../hooks/useSelector';
import {useToggle} from '../../hooks/useToggle';
import {deleteNotebook, keysSelector} from '../../redux/tasksReducer';
import {NotesStackScreenP} from '../types';
import {AddNoteModal} from './AddNoteModal';
import {NotebookCard} from './NotebookCard';
import {NotesDeleteModal} from './NotesDeleteModal';

export const Notes: FC<NotesStackScreenP<'Notebooks'>> = ({navigation}) => {
  const keys = useSelector(keysSelector);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [selectedNotebooks, setSelectedNotebooks] = useState<Array<string>>([]);
  const {state: isVisible, toggle: toggleIsVisible} = useToggle(false);
  const {state: isModalVisible, toggle: toggleIsModalVisible} =
    useToggle(false);
  const {bottom} = useSafeAreaInsets();

  const deleteNotebooks = () => {
    for (const notebook of selectedNotebooks) {
      dispatch(deleteNotebook({notebook}));
    }
    setSelectedNotebooks([]);
    toggleIsModalVisible();
  };

  return (
    <Container>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={navigation.openDrawer} />
        <Appbar.Content title={t('notebooks')} />
        <Appbar.Action
          icon="magnify"
          onPress={() => navigation.navigate('Search')}
        />
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
        <Appbar style={styles.bottomAppbar} safeAreaInsets={{bottom}}>
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
      <NotesDeleteModal
        isModalVisible={isModalVisible}
        toggleIsModalVisible={toggleIsModalVisible}
        deleteNotebooks={deleteNotebooks}
        selectedNotebooks={selectedNotebooks}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 20,
  },
  bottomAppbar: {height: 50},
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
