import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Notes} from '../Notes';
import {Notebook} from '../Notebook';
import {NotesStackParamList} from '../types';
import {Search} from '../Search';
import {Note} from '../Note';

const Stack = createStackNavigator<NotesStackParamList>();

export const Notebooks = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Notebooks">
      <Stack.Screen name="Notebooks" component={Notes} />
      <Stack.Screen name="Notebook" component={Notebook} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Note" component={Note} />
    </Stack.Navigator>
  );
};
