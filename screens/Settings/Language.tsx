import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, Searchbar} from 'react-native-paper';
import {Container} from '../../components/Container';
import {useToggle} from '../../hooks/useToggle';
import {SettingsStackScreenP} from '../types';

const languageOptions = [
  {code: 'uk', label: 'Українська'},
  {code: 'de', label: 'Deutsch'},
  {code: 'en', label: 'English'},
];

export const LanguageSettings: FC<SettingsStackScreenP<'Language'>> = ({
  navigation,
}) => {
  const [search, setSearch] = useState('');
  const {state: isSearching, toggle: toggleIsSearching} = useToggle(false);
  const changeSearch = (s: string) => setSearch(s);
  const stopSearching = () => {
    setSearch('');
    toggleIsSearching();
  };
  return (
    <Container>
      <Appbar.Header>
        {!isSearching && <Appbar.BackAction onPress={navigation.goBack} />}
        {!isSearching && <Appbar.Content title="Language" />}
        {isSearching && (
          <Searchbar
            placeholder="Search"
            value={search}
            onChangeText={changeSearch}
            style={styles.Searchbar}
            onIconPress={stopSearching}
          />
        )}
        {<Appbar.Action icon="magnify" onPress={toggleIsSearching} />}
      </Appbar.Header>
    </Container>
  );
};

const styles = StyleSheet.create({
  Searchbar: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
  },
});
