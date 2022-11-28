import React from 'react';
import {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Modal, ModalProps, useTheme} from 'react-native-paper';

export const CustomModal: FC<ModalProps> = ({
  children,
  contentContainerStyle,
  ...props
}) => {
  const {colors} = useTheme();
  return (
    <Modal
      {...props}
      contentContainerStyle={[
        styles.modalContainer,
        {backgroundColor: colors.surface},
        contentContainerStyle,
      ]}>
      {children}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    padding: 15,
    maxWidth: 350,
  },
});
