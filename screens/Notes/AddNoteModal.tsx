import React, {FC, useState} from 'react';
import {CustomModal} from '../../components/Modal';
import {Button, Text, TextInput} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {useDispatch} from 'react-redux';
import {addNotebook} from '../../redux/tasksReducer';
import {useSelector} from '../../hooks/useSelector';
import {directorySelector} from '../../redux/directoryReducer';

interface Props {
  isVisible: boolean;
  toggleIsVisible: () => void;
}

export const AddNoteModal: FC<Props> = ({isVisible, toggleIsVisible}) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const directory = useSelector(directorySelector);

  const onClose = () => {
    toggleIsVisible();
    setName('');
  };

  const onSubmit = () => {
    if (name.trim() !== '' && directory) {
      RNFetchBlob.fs.createFile(`${directory}/${name}.org`, '', 'utf8');
      dispatch(addNotebook(name));
      onClose();
    }
  };

  return (
    <CustomModal
      visible={isVisible}
      onDismiss={onClose}
      contentContainerStyle={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle} variant="titleLarge">
          New notebook name
        </Text>
        <TextInput
          mode="outlined"
          label="Name"
          style={styles.modalInput}
          value={name}
          onChangeText={setName}
        />
        <View style={styles.modalButtons}>
          <Button mode="text" style={styles.modalCancel} onPress={onClose}>
            Cancel
          </Button>
          <Button mode="text" style={styles.modalSubmit} onPress={onSubmit}>
            OK
          </Button>
        </View>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: 350,
    height: 200,
  },
  modalContent: {
    flex: 1,
  },
  modalTitle: {
    textAlign: 'center',
  },
  modalInput: {
    marginTop: 20,
  },
  modalSubmit: {
    marginLeft: 20,
    marginTop: 20,
  },
  modalCancel: {
    marginLeft: 'auto',
    marginTop: 20,
  },
  modalButtons: {
    flexDirection: 'row',
  },
});
