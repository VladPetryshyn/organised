import {Note} from 'org2json';
import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import Autolink from 'react-native-autolink';
import {
  Card,
  Chip,
  Divider,
  Paragraph,
  Title,
  useTheme,
} from 'react-native-paper';
import {
  DrawerParamList,
  NoteParams,
  NotesStackParamList,
} from '../screens/types';
import {compareArrays} from '../utils/compareArrays';

interface Props extends Note {
  ids: Array<string>;
  notebook: string;
  navigate: (screen: keyof NotesStackParamList, args: NoteParams) => void;
  setSelectedNotes?: Dispatch<SetStateAction<Array<string[]>>>;
  selectedNotes?: Array<Array<string>>;
  isInSearch?: boolean;
}

export const NoteCard: FC<Props> = ({
  title,
  state,
  tags,
  description,
  items,
  ids,
  notebook,
  navigate,
  setSelectedNotes,
  selectedNotes,
  isInSearch,
}) => {
  const isInSelectionMode = selectedNotes!.length > 0;
  const [isSelected, setIsSelected] = useState(false);
  const goToNote = () => {
    navigate('Note', {ids, notebook, isCreating: false});
  };
  const theme = useTheme();
  const selectNote = () => {
    if (!isInSearch) {
      if (!isSelected) {
        setSelectedNotes!(notes => [...notes, ids]);
        setIsSelected(true);
      } else {
        setSelectedNotes!(notes =>
          notes.filter(note => !compareArrays(note, ids)),
        );
        setIsSelected(false);
      }
    }
  };
  return (
    <TouchableOpacity
      onPress={isInSelectionMode ? selectNote : goToNote}
      onLongPress={selectNote}>
      <Card
        style={[
          styles.notebook,
          {
            backgroundColor:
              isSelected && selectedNotes?.length > 0
                ? theme.colors.primary
                : theme.colors.background,
          },
        ]}>
        <Card.Content>
          <View style={styles.title}>
            {state && (
              <Title style={[styles.state, styles.todo]}>{state}</Title>
            )}
            <Autolink text={title} component={Title} url={true} />
          </View>
          {description && <Divider />}
          {description && (
            <Autolink text={description} component={Paragraph} url={true} />
          )}
          <View style={styles.chips}>
            {tags.map(tag => (
              <Chip style={styles.chip} key={tag}>
                {tag}
              </Chip>
            ))}
          </View>
          <FlatList
            data={items}
            renderItem={({item}) => (
              <NoteCard
                {...item}
                ids={[...ids, item.properties.id]}
                notebook={notebook}
                navigate={navigate}
                setSelectedNotes={setSelectedNotes}
                selectedNotes={selectedNotes}
              />
            )}
            keyExtractor={({properties}) => properties.id}
            initialNumToRender={2}
          />
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notebook: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  container: {
    padding: 15,
    paddingTop: 5,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: -5,
  },
  chip: {
    marginTop: 5,
    marginLeft: 5,
  },
  title: {
    flexDirection: 'row',
  },
  state: {
    marginRight: 5,
  },
  done: {
    color: '#6ef40e',
  },
  todo: {
    color: '#f40e0e',
  },
});
