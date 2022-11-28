import React, {FC} from 'react';
import {Text} from 'react-native-paper';
import {CustomModal} from '../../components/Modal';

interface Props {
  tag: string;
  isVisible: boolean;
  toggleVisibility: () => void;
}

export const CreateTagModal: FC<Props> = ({
  tag,
  isVisible,
  toggleVisibility,
}) => {
  return (
    <CustomModal visible={isVisible} onDismiss={toggleVisibility}>
      <Text> hello world</Text>
    </CustomModal>
  );
};
