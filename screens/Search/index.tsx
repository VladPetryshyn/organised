import {Note, Notes} from 'org2json';
import React, {FC, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {Container} from '../../components/Container';
import {CustomInput} from '../../components/CustomInput';
import {NoteCard} from '../../components/NoteCard';
import {useSelector} from '../../hooks/useSelector';
import {selectAllNotebooksData} from '../../redux/tasksReducer';
import {NotebookCard} from '../Notes/NotebookCard';
import {NotesStackScreenP} from '../types';

interface convertedDataI extends Note {
  notebook: string;
  ids: string[];
}

export const Search: FC<NotesStackScreenP<'Search'>> = ({navigation}) => {
  const allNotebooksData = useSelector(selectAllNotebooksData);
  const [searchQuery, setSearchQuery] = useState('');
  const {t} = useTranslation();
  const convertedData = useMemo(() => {
    let convertedDataArray: Array<convertedDataI> = [];

    const convert = (data: Notes, key: string, ids: Array<string>) => {
      convertedDataArray.push(
        ...data.map(notebook => {
          if (notebook.items.length > 0) {
            convert(notebook.items, key, [notebook.properties.id]);
          }
          return {
            ...notebook,
            notebook: key,
            items: [],
            ids: [...ids, notebook.properties.id],
          };
        }),
      );
    };

    for (const key of Object.keys(allNotebooksData)) {
      convert(allNotebooksData[key], key, []);
    }
    return convertedDataArray;
  }, [allNotebooksData]);

  const filteredNotebooks = Object.keys(allNotebooksData).filter(
    key => key.includes(searchQuery) && searchQuery,
  );

  const data = [
    // description
    ...convertedData.filter(
      note => note.description.includes(searchQuery) && searchQuery,
    ),
    // title
    ...convertedData.filter(
      note => note.title.includes(searchQuery) && searchQuery,
    ),
  ];
  const filteredNotes = data.reduce(
    (acc, curr) =>
      data.find(itm => itm.properties.id === curr.properties.id) &&
      !acc.find(itm => itm.properties.id === curr.properties.id)
        ? [...acc, curr]
        : acc,
    [] as Array<convertedDataI>,
  );

  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <CustomInput onChangeText={setSearchQuery} placeholder={t('search')} />
      </Appbar.Header>
      <View style={styles.view}>
        {filteredNotebooks.length > 0 && (
          <FlatList
            data={filteredNotebooks}
            renderItem={({item}) => (
              <NotebookCard
                name={item}
                navigation={navigation}
                isInSearch={true}
              />
            )}
          />
        )}
      </View>
      <View style={styles.view}>
        {filteredNotes.length > 0 && (
          <FlatList
            renderItem={({item}) => (
              <NoteCard {...item} navigate={navigation.navigate} />
            )}
            data={filteredNotes}
          />
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});
