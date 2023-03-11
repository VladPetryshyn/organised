import React, {FC} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Appbar, List, Switch, Text, useTheme} from 'react-native-paper';
import {Container} from '../../../components/Container';
import {useToggle} from '../../../hooks/useToggle';
import {SettingsStackScreenP} from '../../types';
import {useTranslation} from 'react-i18next';
import {useDispatch} from '../../../hooks/useDispatch';
import {isDarkSelector, setIsDarkTheme} from '../../../redux/themeReducer';
import {useSelector} from '../../../hooks/useSelector';
import {ChangePrimaryModal} from './ChangePrimaryModal';

export const StylingSettings: FC<SettingsStackScreenP<'Styling'>> = ({
  navigation,
}) => {
  const {state: isModalShown, toggle: toggleModalShown} = useToggle();
  const isDark = useSelector(isDarkSelector);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {colors} = useTheme();

  const toggleIsDark = () => void dispatch(setIsDarkTheme(!isDark));

  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title={t('styling')} />
      </Appbar.Header>
      <View style={styles.stylingContainer}>
        <TouchableWithoutFeedback>
          <View style={styles.switchContainer}>
            <Text variant="titleMedium">{t('dark_theme')}</Text>
            <Switch
              value={isDark}
              style={styles.switch}
              onChange={toggleIsDark}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={toggleModalShown}>
          <List.Item
            title={t('accent_color')}
            description={t('accent_color_desc')}
            left={() => (
              <View style={[styles.color, {backgroundColor: colors.primary}]} />
            )}
          />
        </TouchableOpacity>
      </View>
      <ChangePrimaryModal visible={isModalShown} onDismiss={toggleModalShown} />
    </Container>
  );
};

const styles = StyleSheet.create({
  stylingContainer: {
    padding: 15,
    justifyContent: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
  },
  switch: {
    marginLeft: 'auto',
  },
  color: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 10,
  },
});
