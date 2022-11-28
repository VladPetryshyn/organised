import React, {FC, useState} from 'react';
import {Appbar, Searchbar} from 'react-native-paper';
import {Container} from '../../components/Container';
import {SettingsStackScreenP} from '../types';

export const LanguageSettings: FC<SettingsStackScreenP<'Language'>> = ({
  navigation,
}) => {
  const [search, setSearch] = useState('');
  const changeSearch = (s: string) => setSearch(s);
  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Language" />
      </Appbar.Header>
      <Searchbar
        placeholder="Search"
        value={search}
        onChangeText={changeSearch}
      />
    </Container>
  );
};
