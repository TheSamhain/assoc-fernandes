import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { child, push, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, TextInput, useColorScheme } from 'react-native';

import ModalDeleteItem from './ModalDeleteItem';
import Colors from '../../constants/Colors';
import { KEY_KATAS } from '../../constants/Database';
import { firebaseDatabase } from '../../utils/firebaseConfig';
import { youtubeParser } from '../../utils/General';
import { Text, View } from '../Themed';

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
  const [videoName, setVideoName] = useState('');

  const saveItem = () => {
    const dbRef = ref(firebaseDatabase);

    const kataId = uuid || push(child(dbRef, KEY_KATAS)).key;

    set(ref(firebaseDatabase, `${KEY_KATAS}/${kataId}`), {
      nome: name,
      video: 'https://www.youtube.com/embed/' + ytVideoID,
    });

    setIsEditing(false);
  };

  useEffect(() => {
    const loadVideoName = async () => {
      try {
        const response = await axios.get(
          `https://noembed.com/embed?dataType=json&url=https://www.youtube.com/watch?v=${ytVideoID}`,
        );

        const { data } = response;

        if (!data) {
          return;
        }

        const { title } = data;

        if (!title) {
          return setVideoName('ID inválido');
        }

        setVideoName(title);
      } catch (error) {
        console.error(error);
      }
    };

    loadVideoName();
  }, [ytVideoID]);

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

        {ytVideoID && videoName ? (
          <Text style={[styles.videoName, { color }]}>{videoName}</Text>
        ) : (
          <ActivityIndicator color={color} />
        )}
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
    margin: 16,
    width: 500,
    maxWidth: '90%',
    borderRadius: 8,
    alignSelf: 'center',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    marginLeft: 10,
    borderBottomWidth: 1,
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  videoName: {
    marginVertical: 8,
    marginLeft: 10,
  },

  deleteButton: {
    position: 'absolute',
    right: 10,
  },
});
