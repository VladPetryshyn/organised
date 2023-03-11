import React from 'react';
import {StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Container} from './Container';

export const LoadingIndicator = () => {
  return (
    <Container style={styles.loadingContainer}>
      <ActivityIndicator animating={true} size="large" />
    </Container>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
