import {Note, Notes} from 'org2json';
import React, {FC, useMemo, useState} from 'react';
import {FlatList, ScrollView, TextInput} from 'react-native';
import {Appbar} from 'react-native-paper';
import {Container} from '../components/Container';
import {NoteCard} from '../components/NoteCard';
import {useSelector} from '../hooks/useSelector';
import {selectAllNotebooksData} from '../redux/tasksReducer';
import {NotebookCard} from './Notes/NotebookCard';
import {NotesStackScreenP} from './types';

export const Search: FC<NotesStackScreenP<'Search'>> = ({navigation}) => {
  const data = useSelector(selectAllNotebooksData);
  const [searchQuery, setSearchQuery] = useState('');
  const convertedData = useMemo(
    () =>
      Object.keys(data).reduce(
        (acc, curr) => [
          ...acc,
          ...data[curr].map(n => ({...n, notebook: curr})),
        ],
        [] as Notes,
      ),
    [data],
  );

  const filteredNotebooks = Object.keys(data).filter(
    key => key.includes(searchQuery) && searchQuery,
  );
  const filteredByTitle = convertedData.filter(
    note => note.title.includes(searchQuery) && searchQuery,
  );
  const filteredByDescription = convertedData.filter(
    note => note.description.includes(searchQuery) && searchQuery,
  );
  console.log(filteredNotebooks);
  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <TextInput onChangeText={setSearchQuery} />
      </Appbar.Header>
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
      {filteredByTitle.length > 0 && (
        <FlatList
          renderItem={({item}) => (
            <NoteCard
              {...item}
              navigate={navigation.navigate}
              selectedNotes={[]}
              ids={[item.properties.id]}
            />
          )}
        />
      )}
      {filteredByDescription.length > 0 && (
        <FlatList
          data={filteredByDescription}
          renderItem={({item}) => (
            <NoteCard
              {...item}
              navigate={navigation.navigate}
              selectedNotes={[]}
              ids={[item.properties.id]}
            />
          )}
        />
      )}
    </Container>
  );
};
