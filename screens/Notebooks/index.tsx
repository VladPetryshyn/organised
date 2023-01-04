import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Notes} from '../Notes';
import {Notebook} from '../Notebook';
import {NotesStackParamList} from '../types';
import {EditNote} from '../EditNote';

const Stack = createStackNavigator<NotesStackParamList>();

export const Notebooks = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Notebooks">
      <Stack.Screen name="Notebooks" component={Notes} />
      <Stack.Screen
        name="Notebook"
        component={props => <Notebook {...props} />}
      />
      <Stack.Screen name="EditNote" component={EditNote} />
    </Stack.Navigator>
  );
};
