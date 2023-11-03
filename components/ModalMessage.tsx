import React, { useEffect, useMemo, useState } from 'react';
import { Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from './Themed';
import Colors from '../constants/Colors';

type ModalMessageProps = {
  title: string;
  isOpened: boolean;
  closeModal: () => void;
  onClose?: () => void;
};

const ModalMessage: React.FC<ModalMessageProps> = ({ title, isOpened, closeModal, onClose }) => {
  const [previousTitle, setPreviousTitle] = useState(title);

  useEffect(() => {
    if (title) {
      setPreviousTitle(title);
    }
  }, [title]);

  return (
    <Modal visible={isOpened} transparent animationType='fade' onDismiss={closeModal} onRequestClose={closeModal}>
      <View style={styles.background}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={closeModal} />

        <View style={styles.container}>
          <Text style={styles.title}>{previousTitle}</Text>
          <Button title='Fechar' onPress={closeModal} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalMessage;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.static.black80,
  },
  container: {
    backgroundColor: Colors.light.background,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 16,
    padding: 10,
  },

  title: {
    color: Colors.light.text,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 16,
  },
});
