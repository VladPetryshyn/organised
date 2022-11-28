import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Notes} from '../Notes';
import {Notebook} from '../Notebook';
import {Note} from '../Note';
import {AddTags} from '../AddTags';
import {NotesStackParamList} from '../types';

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
      <Stack.Screen name="Note" component={props => <Note {...props} />} />
      <Stack.Screen name="AddTags" component={AddTags} />
    </Stack.Navigator>
  );
};
