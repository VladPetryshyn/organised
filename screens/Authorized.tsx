import React from 'react';
import {DrawerParamList} from '../screens/types';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {CustomDrawer} from '../components/Drawer';
import {SettingsRouter} from './Settings';
import {Notebooks} from './Notebooks';

const Drawer = createDrawerNavigator<DrawerParamList>();

export const Authorized = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawer {...props} />
      )}
      initialRouteName="DrawerNotebooks"
      backBehavior="history">
      <Drawer.Screen name="Settings" component={SettingsRouter} />
      <Drawer.Screen name="DrawerNotebooks" component={Notebooks} />
    </Drawer.Navigator>
  );
};
