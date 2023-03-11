import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CustomModal} from '../../../components/Modal';
import ColorPicker from 'react-native-wheel-color-picker';
import {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ModalProps, useTheme} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {changeThemePrimaryColor} from '../../../redux/themeReducer';

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

export const ChangePrimaryModal: FC<Props> = ({visible, onDismiss}) => {
  const [newPrimary, setNewPrimary] = useState<string>('');
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const onClose = () => {
    onDismiss();
    dispatch(changeThemePrimaryColor(newPrimary));
  };

  return (
    <CustomModal
      visible={visible}
      onDismiss={onClose}
      contentContainerStyle={styles.modalContainer}>
      <TouchableOpacity onPress={onClose}>
        <Icon name="window-close" size={30} color={colors.secondary} />
      </TouchableOpacity>
      <ColorPicker
        color={colors.primary}
        thumbSize={40}
        sliderSize={40}
        noSnap={true}
        row={false}
        onColorChange={setNewPrimary}
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
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: 370,
    height: 370,
  },
});
