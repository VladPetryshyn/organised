import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {FAB, FABProps} from 'react-native-paper';

export const CustomFAB: FC<FABProps> = ({style, ...props}) => {
  return <FAB style={[styles.FAB, style]} size="medium" {...props} />;
};

const styles = StyleSheet.create({
  FAB: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
