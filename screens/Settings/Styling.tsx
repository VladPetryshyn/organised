import React, {FC} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Appbar, List, Modal, Switch, Text, useTheme} from 'react-native-paper';
import ColorPicker from 'react-native-wheel-color-picker';
import {Container} from '../../components/Container';
import {useToggle} from '../../hooks/useToggle';
import {SettingsStackScreenP} from '../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CustomModal} from '../../components/Modal';
import {useTranslation} from 'react-i18next';
import {useDispatch} from '../../hooks/useDispatch';
import {isDarkSelector, toggleIsDarkTheme} from '../../redux/themeReducer';
import {useSelector} from '../../hooks/useSelector';

export const StylingSettings: FC<SettingsStackScreenP<'Styling'>> = ({
  navigation,
}) => {
  const {state: isModalShown, toggle: toggleModalShown} = useToggle();
  const isDark = useSelector(isDarkSelector);
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const {t} = useTranslation();
  const toggleIsDark = () => void dispatch(toggleIsDarkTheme());

  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title={t('styling')} />
      </Appbar.Header>
      <TouchableWithoutFeedback>
        <View style={styles.switchContainer}>
          <Text variant="titleSmall">{t('dark_theme')}</Text>
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
      <CustomModal
        visible={isModalShown}
        onDismiss={toggleModalShown}
        contentContainerStyle={styles.modalContainer}>
        <TouchableOpacity onPress={toggleModalShown}>
          <Icon name="window-close" size={30} color={colors.secondary} />
        </TouchableOpacity>
        <ColorPicker
          color={colors.primary}
          thumbSize={40}
          sliderSize={40}
          noSnap={true}
          row={false}
          palette={[
            '#08A045',
            '#A63446',
            '#C84630',
            '#DB162F',
            '#00A5CF',
            '#861657',
          ]}
          discreteLength={1}
        />
      </CustomModal>
    </Container>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
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
  modalContainer: {
    width: 370,
    height: 370,
  },
});
