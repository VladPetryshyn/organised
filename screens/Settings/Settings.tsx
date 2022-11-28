import {DrawerActions} from '@react-navigation/native';
import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {Appbar, List} from 'react-native-paper';
import {Container} from '../../components/Container';
import {SettingsStackScreenP} from '../types';

export const Settings: FC<SettingsStackScreenP<'Settings'>> = ({
  navigation,
}) => {
  return (
    <Container>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <TouchableOpacity>
        <List.Item
          title="Styling"
          description="Change theme, and primary color"
          left={props => <List.Icon {...props} icon="brush" />}
          onPress={() => navigation.navigate('Styling')}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Language')}>
        <List.Item
          title="Language"
          description="Change application main language"
          left={props => <List.Icon {...props} icon="translate" />}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <List.Item
          title="Info"
          left={props => <List.Icon {...props} icon="information-outline" />}
        />
      </TouchableOpacity>
    </Container>
  );
};
