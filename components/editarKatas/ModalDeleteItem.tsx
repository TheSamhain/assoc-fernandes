import { ref, remove } from 'firebase/database';
import React from 'react';
import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '../../constants/Colors';
import { firebaseDatabase } from '../../utils/firebaseConfig';

interface ModalDeleteItemProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
  kyu: number;
  name: string;
  uuid: string;
}

const ModalDeleteItem: React.FC<ModalDeleteItemProps> = ({ uuid, kyu, name, setIsVisible, isVisible }) => {
  const deletItem = () => {
    const dbRef = ref(firebaseDatabase, `katas/${kyu}/${uuid}`);
    remove(dbRef);
    setIsVisible(false);
  };

  return (
    <Modal transparent visible={isVisible}>
      <TouchableOpacity onPress={() => setIsVisible(false)} style={[StyleSheet.absoluteFill, styles.background]} />

      <View style={[styles.container, { backgroundColor: Colors.dark.text }]}>
        <Text style={[styles.title, { color: Colors.dark.background }]}>Confirma deletar {name}?</Text>

        <View style={styles.buttonsRow}>
          <Button title='Não' onPress={() => setIsVisible(false)} />
          <Button title='Sim' onPress={deletItem} color='#e73a3a' />
        </View>
      </View>
    </Modal>
  );
};

export default ModalDeleteItem;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#000000cc',
  },

  container: {
    borderRadius: 16,
    maxWidth: '80%',
    padding: 16,
    paddingVertical: 32,
    alignSelf: 'center',
    marginVertical: 'auto',
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
