import React, {FC} from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {useTheme} from 'react-native-paper';

export const CustomInput: FC<TextInputProps> = props => {
  const theme = useTheme();
  return (
    <TextInput
      {...props}
      placeholderTextColor={theme.colors.secondary}
      style={{color: theme.colors.secondary}}
    />
  );
};
