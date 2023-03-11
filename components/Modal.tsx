import React from 'react';
import {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Modal, ModalProps, Portal, useTheme} from 'react-native-paper';
import {borderRadius} from '../constants';

export const CustomModal: FC<ModalProps> = ({
  children,
  contentContainerStyle,
  ...props
}) => {
  const {colors} = useTheme();
  return (
    <Portal>
      <Modal
        {...props}
        contentContainerStyle={[
          styles.modalContainer,
          {backgroundColor: colors.surface},
          contentContainerStyle,
        ]}>
        {children}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius,
    padding: 15,
    maxWidth: 350,
  },
});
