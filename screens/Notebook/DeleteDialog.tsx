import React from 'react';
import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Dialog, Portal} from 'react-native-paper';

interface Props {
  isDeleteModalVisible: boolean;
  setIsDeleteModalVisible(): void;
  selectedNotes: string[][];
  onDelete: () => void;
}

export const DeleteDialog: FC<Props> = ({
  isDeleteModalVisible,
  setIsDeleteModalVisible,
  selectedNotes,
  onDelete,
}) => {
  const {t} = useTranslation();
  return (
    <Portal>
      <Dialog
        visible={isDeleteModalVisible}
        onDismiss={setIsDeleteModalVisible}>
        <Dialog.Title>
          {t('are_you_sure_delete')} {selectedNotes.length}
          {t('lnotes')}
        </Dialog.Title>
        <Dialog.Actions>
          <Button mode="text" onPress={setIsDeleteModalVisible}>
            {t('cancel')}
          </Button>
          <Button mode="text" onPress={onDelete}>
            OK
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
