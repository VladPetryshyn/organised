import {Note, Notes} from 'org2json';
import React, {FC, useMemo, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import {Container} from '../components/Container';
import {CustomInput} from '../components/CustomInput';
import {NoteCard} from '../components/NoteCard';
import {useSelector} from '../hooks/useSelector';
import {selectAllNotebooksData} from '../redux/tasksReducer';
import {NotebookCard} from './Notes/NotebookCard';
import {NotesStackScreenP} from './types';

export const Search: FC<NotesStackScreenP<'Search'>> = ({navigation}) => {
  const searchData = useSelector(selectAllNotebooksData);
  const [searchQuery, setSearchQuery] = useState('');
  const convertedData = useMemo(() => {
    const converter = (data: typeof searchData): Notes =>
      Object.keys(data).reduce(
        (acc, curr) => [
          ...acc,
          ...data[curr].map(n => ({...n, notebook: curr, items: []})),
        ],
        [] as Notes,
      );

    console.log(searchData);
    return converter(searchData);
  }, [searchData]);
  console.log(convertedData);

  const filteredNotebooks = Object.keys(searchData).filter(
    key => key.includes(searchQuery) && searchQuery,
  );
  const filteredByTitle = convertedData.filter(
    note => note.title.includes(searchQuery) && searchQuery,
  );
  const filteredByDescription = convertedData.filter(
    note => note.description.includes(searchQuery) && searchQuery,
  );
  const filteredNotes = useMemo(() => {
    const data = [...filteredByTitle, ...filteredByDescription];
    return data.reduce(
      (acc, curr) =>
        data.find(itm => itm.properties.id === curr.properties.id) &&
        !acc.find(itm => itm.properties.id === curr.properties.id)
          ? [...acc, curr]
          : acc,
      [] as Array<Note>,
    );
  }, [searchQuery]);

  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <CustomInput onChangeText={setSearchQuery} placeholder="Search" />
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
            contentContainerStyle={{paddingBottom: 10}}
          />
        )}
      </View>
      <View style={styles.view}>
        {filteredNotes.length > 0 && (
          <FlatList
            renderItem={({item}) => (
              <NoteCard
                {...item}
                navigate={navigation.navigate}
                selectedNotes={[]}
                ids={[item.properties.id]}
              />
            )}
            data={filteredNotes}
          />
        )}
      </View>
    </Container>
  );
};

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  view: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});
