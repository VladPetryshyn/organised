import React, {FC, useMemo, useState} from 'react';
import {FlatList, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Appbar, Checkbox, Text, useTheme} from 'react-native-paper';
import {Container} from '../../components/Container';
import {NotesStackScreenP} from '../types';
import {useToggle} from '../../hooks/useToggle';
import {CreateTagModal} from './CreateTagModal';
import {useSelector} from '../../hooks/useSelector';
import {tagsNameSelector} from '../../redux/tagsReducer';

export const AddTags: FC<NotesStackScreenP<'AddTags'>> = ({navigation}) => {
  const {colors} = useTheme();
  const color = useMemo(() => (colors.dark ? '#fff' : '#000'), [colors]);
  const [tag, setTag] = useState('');
  const {state: isVisible, toggle: toggleVisibility} = useToggle(false);
  const tagsNames = useSelector(tagsNameSelector());

  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Note')} />
        <TextInput
          placeholder="Enter tag name"
          style={[styles.search, {color}]}
          placeholderTextColor={color}
          value={tag}
          onChangeText={setTag}
        />
      </Appbar.Header>
      <FlatList
        data={tagsNames}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.item} onPress={toggleVisibility}>
            <Text variant="titleLarge" style={styles.itemTitle}>
              {item}
            </Text>
            <Checkbox status={'checked'} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
      />
      <CreateTagModal
        isVisible={isVisible}
        toggleVisibility={toggleVisibility}
        tag={tag}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  search: {
    marginRight: 60,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  itemTitle: {
    marginRight: 'auto',
  },
});
