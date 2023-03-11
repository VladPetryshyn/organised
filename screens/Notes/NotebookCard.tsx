import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Title, useTheme} from 'react-native-paper';
import {DrawerParamList} from '../types';
import {borderRadius} from '../../constants';

interface Props {
  name: string;
  navigation: StackNavigationProp<DrawerParamList, 'DrawerNotebooks'>;
  selectedNotebooks?: Array<string>;
  setSelectedNotebooks?: React.Dispatch<React.SetStateAction<string[]>>;
  isInSearch?: boolean;
}

export const NotebookCard: FC<Props> = ({
  navigation,
  name,
  selectedNotebooks = [],
  setSelectedNotebooks,
  isInSearch,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const theme = useTheme();

  const isInSelectionMode = selectedNotebooks?.length > 0;

  const selectNotebook = () => {
    if (!isSelected) {
      setSelectedNotebooks!(notes => [...notes, name]);
      setIsSelected(true);
    } else {
      setSelectedNotebooks!(notes => notes.filter(note => note !== name));
      setIsSelected(false);
    }
  };
  console.log(selectedNotebooks);

  return (
    <TouchableOpacity
      onPress={
        isInSelectionMode
          ? selectNotebook
          : () => navigation.navigate('Notebook', {name})
      }
      onLongPress={!isInSearch ? selectNotebook : () => undefined}>
      <Card
        style={[
          styles.notebook,
          {
            backgroundColor: isSelected
              ? theme.colors.primary
              : theme.colors.background,
          },
        ]}>
        <Card.Content>
          <Title>{name}</Title>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notebook: {
    marginTop: 10,
    borderRadius,
  },
});
