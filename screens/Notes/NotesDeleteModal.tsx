import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Dialog} from 'react-native-paper';

interface Props {
  isModalVisible: boolean;
  toggleIsModalVisible: () => void;
  selectedNotebooks: string[];
  deleteNotebooks: () => void;
}

export const NotesDeleteModal: FC<Props> = ({
  isModalVisible,
  toggleIsModalVisible,
  deleteNotebooks,
  selectedNotebooks,
}) => {
  const {t} = useTranslation();
  return (
    <Dialog visible={isModalVisible} onDismiss={toggleIsModalVisible}>
      <Dialog.Title>
        {t('are_you_sure_delete')} {selectedNotebooks.length}
        {t('lnotebooks')}
      </Dialog.Title>
      <Dialog.Actions>
        <Button mode="text" onPress={toggleIsModalVisible}>
          {t('cancel')}
        </Button>
        <Button mode="text" onPress={deleteNotebooks}>
          OK
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
