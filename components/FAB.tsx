import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {FAB, FABProps} from 'react-native-paper';
import {useSelector} from '../hooks/useSelector';
import {themeSelector} from '../redux/themeReducer';
import {invertColor} from '../utils/colorInverter';

export const CustomFAB: FC<FABProps> = ({style, ...props}) => {
  const {primary} = useSelector(themeSelector);
  return (
    <FAB
      style={[styles.FAB, style]}
      size="medium"
      {...props}
      color={invertColor(primary, true)}
    />
  );
};

const styles = StyleSheet.create({
  FAB: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
