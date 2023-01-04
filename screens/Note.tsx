import React, {FC, useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, TextInput} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import {Container} from '../components/Container';
import {useDispatch} from '../hooks/useDispatch';
import {useSelector} from '../hooks/useSelector';
import {v4} from 'uuid';
import {notebookSelector, noteSelector} from '../redux/tasksReducer';
import {EditNoteStackScreenP, NoteParams, NotesStackScreenP} from './types';
import {jsonToOrg, Note as NoteT} from 'org2json';
import RNFetchBlob from 'rn-fetch-blob';
import {directorySelector} from '../redux/directoryReducer';
import deepClone from 'lodash.clonedeep';

interface Props extends NoteParams, EditNoteStackScreenP<'Note'> {}

export const Note: FC<Props> = ({navigation, notebook, ids, isCreating}) => {
  const colors = useTheme();
  const directory = useSelector(directorySelector);
  const notebookArray = useSelector(notebookSelector(notebook));
  const color = useMemo(() => (colors.dark ? '#fff' : '#000'), [colors]);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const noteData = useSelector(
    noteSelector(notebook && ids ? {notebook, ids} : undefined),
  );

  useEffect(() => {
    if (noteData && !isCreating) {
      setTitle(noteData.title);
      setDescription(noteData.description);
    }
  }, [noteData]);

  const createNote = async () => {
    const newNote = {
      title,
      description,
      properties: {id: v4()},
      items: [],
      tags: [],
      state: '',
      level: 1,
    };

    if (notebook && directory && !ids) {
      RNFetchBlob.fs.writeFile(
        `${directory}/${notebook}.org`,
        jsonToOrg([...notebookArray, newNote]),
      );
      navigation.goBack();
      return;
    }

    if (ids) {
      newNote.level = ids.length + 1;
      const newNotebook = deepClone(notebookArray);
      const localIds = [...ids];

      const updater = (n: NoteT) => {
        if (localIds.length === 0) {
          n.items = [...n.items, newNote];
        }
        const id = localIds.shift();
        n.items.forEach(i => i.properties.id === id && updater(i));
      };
      updater({items: newNotebook});
      RNFetchBlob.fs.writeFile(
        `${directory}/${notebook}.org`,
        jsonToOrg(newNotebook),
      );
      navigation.goBack();
    }
  };

  const updateNote = async () => {
    if (noteData && ids) {
      const updatedNote = {...noteData, title, description};
      let newNotebook: Array<NoteT> = deepClone(notebookArray);
      const localIds = [...ids];

      const updater = (it: NoteT) => {
        if (localIds.length === 1) {
          const id = localIds.shift();
          it.items = it.items.map(t =>
            t.properties.id === id ? updatedNote : t,
          );
          return it;
        }

        const id = localIds.shift();
        it.items = it.items.map(t => (t.properties.id === id ? updater(t) : t));

        return it;
      };

      await RNFetchBlob.fs.writeFile(
        `${directory}/${notebook}.org`,
        jsonToOrg(updater({items: newNotebook}).items),
      );
      navigation.goBack();
    }
  };

  return (
    <Container>
      <ScrollView>
        <Appbar.Header>
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content title="" />
          <Appbar.Action
            icon="check"
            onPress={!isCreating && ids ? updateNote : createNote}
            style={{backgroundColor: 'red'}}
          />
        </Appbar.Header>
        <TextInput
          placeholder="Title"
          autoCapitalize="sentences"
          style={[styles.title, {color}]}
          placeholderTextColor={color}
          multiline={true}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Description"
          autoCapitalize="sentences"
          style={[styles.description, {color}]}
          placeholderTextColor={color}
          multiline={true}
          numberOfLines={29}
          value={description}
          onChangeText={setDescription}
        />
      </ScrollView>
      <Appbar>
        <Appbar.Action
          icon="tag-outline"
          onPress={() => navigation.navigate('AddTags')}
        />
        <Appbar.Action icon="plus-box-outline" />
      </Appbar>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
  description: {
    fontSize: 20,
    textAlignVertical: 'top',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  SheetButton: {
    marginLeft: 'auto',
    marginTop: 10,
    marginRight: 10,
  },
});
