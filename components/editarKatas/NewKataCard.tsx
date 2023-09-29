import { MaterialCommunityIcons } from '@expo/vector-icons';
import { child, push, ref, set } from 'firebase/database';
import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import { KEY_KATAS } from '../../constants/Database';
import { firebaseDatabase } from '../../utils/firebaseConfig';
import { youtubeParser } from '../../utils/General';
import { Text, View } from '../Themed';
import ModalDeleteItem from './ModalDeleteItem';

interface NewKataCardProps {
  nome: string;
  video: string;
  uuid?: string;
}

const NewKataCard: React.FC<NewKataCardProps> = ({ nome, video, uuid }) => {
  const theme = useColorScheme() ?? 'light';

  const [name, setName] = useState(nome);
  const [ytVideoID, setYtVideoID] = useState(video ? youtubeParser(video) : '');
  const [isEditing, setIsEditing] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);

  const saveItem = () => {
    const dbRef = ref(firebaseDatabase);

    const kataId = uuid || push(child(dbRef, KEY_KATAS)).key;

    set(ref(firebaseDatabase, `${KEY_KATAS}/${kataId}`), {
      nome: name,
      video: 'https://www.youtube.com/embed/' + ytVideoID,
    });

    setIsEditing(false);
  };

  const color = Colors[theme].background;
  const backgroundColor = Colors[theme].text;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.inputContainer, { backgroundColor }]}>
        <Text style={[styles.label, { color }]}>Nome</Text>

        <TextInput
          style={[styles.input, { color }]}
          value={name}
          onChangeText={(text) => {
            setName(text);
            setIsEditing(true);
          }}
        />
      </View>

      <View style={[styles.inputContainer, { backgroundColor }]}>
        <Text style={[styles.label, { color }]}>ID Video Youtube</Text>

        <TextInput
          style={[styles.input, { color }]}
          value={ytVideoID}
          onChangeText={(text) => {
            setYtVideoID(youtubeParser(text) || text);
            setIsEditing(true);
          }}
        />
      </View>

      {isEditing ? <Button title='Confirmar' onPress={saveItem} /> : <></>}

      {uuid ? (
        <>
          <MaterialCommunityIcons
            onPress={() => setIsModalDeleteVisible(true)}
            color='red'
            size={24}
            name='trash-can-outline'
            style={styles.deleteButton}
          />

          <ModalDeleteItem
            uuid={uuid}
            isVisible={isModalDeleteVisible}
            setIsVisible={setIsModalDeleteVisible}
            name={name}
          />
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default NewKataCard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 8,
    width: 500,
    maxWidth: '90%',
    margin: 8,
    borderRadius: 8,
    alignSelf: 'center',
  },
  label: {
    marginBottom: 8,
  },
  input: {
    marginLeft: 10,
    borderBottomWidth: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },

  deleteButton: {
    position: 'absolute',
    right: 10,
  },
});
