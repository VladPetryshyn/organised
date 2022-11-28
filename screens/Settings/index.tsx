import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SettingsStackParamList} from '../types';
import {LanguageSettings} from './Language';
import {Settings} from './Settings';
import {StylingSettings} from './Styling';

const SettingsStackNavigator = createStackNavigator<SettingsStackParamList>();

export const SettingsRouter = () => {
  return (
    <SettingsStackNavigator.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: false,
      }}>
      <SettingsStackNavigator.Screen name="Settings" component={Settings} />
      <SettingsStackNavigator.Screen
        name="Language"
        component={LanguageSettings}
      />
      <SettingsStackNavigator.Screen
        name="Styling"
        component={StylingSettings}
      />
    </SettingsStackNavigator.Navigator>
  );
};
