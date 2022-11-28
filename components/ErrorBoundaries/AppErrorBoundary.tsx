import React, {ErrorInfo, ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {Container} from '../Container';

interface State {
  hasError: boolean;
}

interface Props {
  children: ReactNode;
}

export class AppErrorBoundary extends React.Component<Props, State> {
  public state: State = {hasError: false};

  static getDerivedStateFromError(_: Error): State {
    return {hasError: true};
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
  }

  public render() {
    return (
      <Container style={styles.container}>
        <Text>Some serious error occurred</Text>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
