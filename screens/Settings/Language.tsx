import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar, Searchbar, Text} from 'react-native-paper';
import {Container} from '../../components/Container';
import {useToggle} from '../../hooks/useToggle';
import {SettingsStackScreenP} from '../types';
import {useTranslation} from 'react-i18next';

const languageOptions = [
  {code: 'uk', label: 'Українська'},
  {code: 'de', label: 'Deutsch'},
  {code: 'en', label: 'English'},
];

export const LanguageSettings: FC<SettingsStackScreenP<'Language'>> = ({
  navigation,
}) => {
  const [search, setSearch] = useState('');
  const {t, i18n} = useTranslation();
  const {state: isSearching, toggle: toggleIsSearching} = useToggle(false);

  const languages = languageOptions.filter(option =>
    option.label.includes(search),
  );

  const changeSearch = (s: string) => setSearch(s);
  const stopSearching = () => {
    setSearch('');
    toggleIsSearching();
  };

  return (
    <Container>
      <Appbar.Header>
        {!isSearching && (
          <>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Appbar.Content title={t('language')} />
          </>
        )}
        {isSearching && (
          <Searchbar
            placeholder={t('search')!}
            value={search}
            onChangeText={changeSearch}
            style={styles.Searchbar}
            onIconPress={stopSearching}
          />
        )}
        {<Appbar.Action icon="magnify" onPress={toggleIsSearching} />}
      </Appbar.Header>
      <View style={styles.List}>
        {languages.map(({code, label}) => (
          <Text
            variant="headlineSmall"
            style={styles.Text}
            onPress={() => i18n.changeLanguage(code)}>
            {label}
          </Text>
        ))}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  Searchbar: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
  },
  List: {
    paddingLeft: 20,
  },
  Text: {
    paddingTop: 10,
  },
});
