import React, {PropsWithChildren} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {Surface} from 'react-native-paper';

interface Props {
  style?: ViewStyle;
}

export const Container: React.FC<PropsWithChildren<Props>> = ({
  children,
  style,
}) => <Surface style={[styles.container, style]}>{children}</Surface>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
