import {Note} from 'org2json';
import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Autolink from 'react-native-autolink';
import {
  Card,
  Chip,
  Divider,
  Paragraph,
  Title,
  useTheme,
} from 'react-native-paper';
import {NoteParams, NotesStackParamList} from '../screens/types';
import {compareArrays} from '../utils/compareArrays';
import {borderRadius} from '../constants';

interface DefaultProps extends Note {
  ids: Array<string>;
  notebook: string;
  navigate: (screen: keyof NotesStackParamList, args: NoteParams) => void;
  setSelectedNotes?: Dispatch<SetStateAction<Array<string[]>>>;
  selectedNotes?: Array<Array<string>>;
  isInSearch?: boolean;
}

export const NoteCardDefault: FC<DefaultProps> = ({
  ids,
  notebook,
  navigate,
  setSelectedNotes,
  selectedNotes,
  isInSearch,
  ...props
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const theme = useTheme();
  const isInSelectionMode = selectedNotes!.length > 0;

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

  const cardStyles = {
    backgroundColor:
      isSelected && isInSelectionMode
        ? theme.colors.primary
        : theme.colors.background,
  };

  return (
    <NoteCard
      cardStyles={cardStyles}
      isInSelectionMode={isInSelectionMode}
      selectNote={selectNote}
      ids={ids}
      notebook={notebook}
      navigate={navigate}
      selectedNotes={selectedNotes}
      setSelectedNotes={setSelectedNotes}
      {...props}
    />
  );
};

interface Props extends DefaultProps {
  isInSelectionMode?: boolean;
  selectNote?: () => void;
  cardStyles?: ViewStyle;
}

export const NoteCard: FC<Props> = ({
  selectNote,
  isInSelectionMode,
  cardStyles,
  state,
  title,
  description,
  tags,
  items,
  notebook,
  ids,
  selectedNotes,
  setSelectedNotes,
  navigate,
}) => {
  const goToNote = () => {
    navigate('Note', {ids, notebook, isCreating: false});
  };
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={isInSelectionMode && selectNote ? selectNote : goToNote}
      onLongPress={selectNote}>
      <Card
        style={[
          {backgroundColor: theme.colors.background},
          styles.notebook,
          cardStyles,
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
              <NoteCardDefault
                {...item}
                ids={[...ids, item.properties.id]}
                notebook={notebook}
                navigate={navigate}
                setSelectedNotes={setSelectedNotes}
                selectedNotes={selectedNotes}
              />
            )}
            keyExtractor={({properties}) => properties.id}
            initialNumToRender={3}
          />
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notebook: {
    marginTop: 10,
    borderRadius,
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
