import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {Drawer} from 'react-native-paper';
import {useSelector} from '../../hooks/useSelector';
import {keysSelector} from '../../redux/tasksReducer';
import {Container} from '../Container';

export const CustomDrawer: FC<DrawerContentComponentProps> = ({
  navigation,
  state,
}) => {
  const {index, routeNames, routes} = state;
  const keys = useSelector(keysSelector);
  const {t} = useTranslation();

  return (
    <Container>
      <DrawerContentScrollView>
        <Drawer.Section style={styles.container}>
          <Drawer.Item
            label={t('notebooks')}
            onPress={() => navigation.navigate('Notebooks')}
            active={routeNames[index] === 'Notebooks'}
            icon="note-text"
          />
          {keys.map(key => (
            <Drawer.Item
              label={key}
              key={key}
              onPress={() => navigation.navigate('Notebook', {name: key})}
              active={
                routeNames[index] === 'Notebook' &&
                (routes[index].params as any).name === key
              }
            />
          ))}
          <Drawer.Item
            label={t('settings')}
            onPress={() => navigation.navigate('Settings')}
            icon="cog-outline"
          />
        </Drawer.Section>
      </DrawerContentScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
});
