import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AddTags} from '../AddTags';
import {Note} from '../Note';
import {EditNoteStackParamList, NotesStackScreenP} from '../types';

const Stack = createStackNavigator<EditNoteStackParamList>();

export const EditNote: FC<NotesStackScreenP<'EditNote'>> = ({route}) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Note">
      <Stack.Screen
        name="Note"
        component={props => <Note {...props} {...route.params} />}
      />
      <Stack.Screen
        name="AddTags"
        component={props => <AddTags {...props} />}
      />
    </Stack.Navigator>
  );
};
