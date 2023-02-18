import {DrawerActions} from '@react-navigation/native';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';
import {Appbar, List} from 'react-native-paper';
import {Container} from '../../components/Container';
import {SettingsStackScreenP} from '../types';

export const Settings: FC<SettingsStackScreenP<'Settings'>> = ({
  navigation,
}) => {
  const {t} = useTranslation();
  return (
    <Container>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <Appbar.Content title={t('settings')} />
      </Appbar.Header>
      <TouchableOpacity>
        <List.Item
          title={t('styling')}
          description={t('styling_desc')}
          left={props => <List.Icon {...props} icon="brush" />}
          onPress={() => navigation.navigate('Styling')}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Language')}>
        <List.Item
          title={t('language')}
          description={t('language_desc')}
          left={props => <List.Icon {...props} icon="translate" />}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <List.Item
          title={t('info')}
          left={props => <List.Icon {...props} icon="information-outline" />}
        />
      </TouchableOpacity>
    </Container>
  );
};
