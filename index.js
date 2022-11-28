import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
  Text,
} from 'react-native-paper';
import {Provider} from 'react-redux';
import {store} from './redux/mainReducer';
import {useSelector} from './hooks/useSelector';
import {themeSelector} from './redux/themeReducer';

const Main = () => {
  return (
    <Provider store={store}>
      <NavigationContainer dark={true}>
        <ThemedMain />
      </NavigationContainer>
    </Provider>
  );
};

const ThemedMain = () => {
  const theme = useSelector(themeSelector);
  const themeLight = React.useMemo(
    () => ({
      ...MD3LightTheme,
      colors: {
        ...MD3LightTheme.colors,
        primary: theme.primary,
        primaryContainer: theme.primary,
        onPrimary: theme.primary,
        // onPrimaryContainer: theme.primary,
      },
    }),
    [theme],
  );
  const themeDark = React.useMemo(
    () => ({
      ...MD3DarkTheme,
      colors: {
        ...MD3DarkTheme.colors,
        primary: theme.primary,
        primaryContainer: theme.primary,
        onPrimary: theme.primary,
        onPrimaryContainer: theme.primary,
        secondary: theme.primary,
        onSecondary: theme.primary,
        onSecondaryContainer: theme.primary,
      },
    }),
    [theme],
  );

  return (
    <PaperProvider theme={themeLight}>
      <App />
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
