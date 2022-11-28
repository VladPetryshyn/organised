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

export const StylingSettings: FC<SettingsStackScreenP<'Styling'>> = ({
  navigation,
}) => {
  const {state: isModalShown, toggle: toggleModalShown} = useToggle();
  const {colors} = useTheme();
  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Styling" />
      </Appbar.Header>
      <TouchableWithoutFeedback>
        <View style={styles.switchContainer}>
          <Text variant="titleSmall">Dark Theme</Text>
          <Switch value={true} style={styles.switch} />
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity onPress={toggleModalShown}>
        <List.Item
          title="Accent color"
          description="Press to change accent color"
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
