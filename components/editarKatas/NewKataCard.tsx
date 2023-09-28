import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import { youtubeParser } from '../../utils/General';
import { Text, View } from '../Themed';

interface NewKataCardProps {
  nome: string;
  video: string;
}

const NewKataCard: React.FC<NewKataCardProps> = ({ nome, video }) => {
  const theme = useColorScheme() ?? 'light';

  const [name, setName] = useState(nome);
  const [ytVideoID, setYtVideoID] = useState(youtubeParser(video));
  const [isEditing, setIsEditing] = useState(false);

  const saveItem = () => {
    console.log('sabe item');
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
    </View>
  );
};

export default NewKataCard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 8,
    width: 500,
    maxWidth: '100%',
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
});
