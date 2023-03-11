import './translations/translation';
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {Provider} from 'react-redux';
import {store} from './redux/mainReducer';
import {useSelector} from './hooks/useSelector';
import {
  changeThemePrimaryColor,
  setIsDarkTheme,
  themeSelector,
} from './redux/themeReducer';
import {isDarkAsyncStorageKey, primaryColorAsyncStorageKey} from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from './hooks/useDispatch';

const Main = () => {
  return (
    <Provider store={store}>
      <ThemedMain />
    </Provider>
  );
};

const ThemedMain = () => {
  const theme = useSelector(themeSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getIsDark = async () => {
      dispatch(
        setIsDarkTheme(
          (await AsyncStorage.getItem(isDarkAsyncStorageKey)) === 'true',
        ),
      );
      dispatch(
        changeThemePrimaryColor(
          (await AsyncStorage.getItem(primaryColorAsyncStorageKey)) ??
            theme.primary,
        ),
      );
    };
    getIsDark();
  }, []);

  const themeLight = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: theme.primary,
      primaryContainer: theme.primary,
    },
  };
  const themeDark = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: theme.primary,
      primaryContainer: theme.primary,
    },
  };

  return (
    <NavigationContainer theme={theme.isDark ? DarkTheme : DefaultTheme}>
      <PaperProvider theme={theme.isDark ? themeDark : themeLight}>
        <App />
      </PaperProvider>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => Main);
