import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Button, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import CustomCheckBox from '../../../components/CustomCheckBox';
import CustomInput from '../../../components/CustomInput';
import ModalMessage from '../../../components/ModalMessage';
import { Text, View } from '../../../components/Themed';
import { Cities, City } from '../../../constants/Cities';
import Colors from '../../../constants/Colors';

const ScreenNewPost = () => {
  const theme = useColorScheme() ?? 'light';
  const backgroundColor = Colors[theme].text;
  const color = Colors[theme].background;

  const [title, seTitle] = useState('');
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [medias, setMedias] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const checkCity = (city: City, isChecked: boolean) => {
    if (isChecked) {
      return setSelectedCities((old) => {
        if (old.includes(city)) {
          return old;
        }

        return [...old, city];
      });
    }

    setSelectedCities((old) => {
      const currentIndex = old.indexOf(city);

      if (currentIndex === -1) {
        return old;
      }

      old.splice(currentIndex, 1);
      return old;
    });
  };

  const handlePublish = () => {
    if (!title.trim()) {
      return setMessage('Digite o título da publicação');
    }

    if (!selectedCities.length) {
      return setMessage('Selecione ao menos uma cidade');
    }

    if (!medias.length) {
      return setMessage('Inclua pelo menos uma foto ou vídeo');
    }
  };

  const handleAddMedia = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // quality: 1,
    });

    if (!result.canceled) {
      setMedias((old) => [...old, ...result.assets.map(({ uri }) => uri)]);
    }
  };

  const justifyContent = medias.length >= 2 ? 'space-between' : 'flex-start';

  if (!__DEV__) {
    return <Text style={styles.developmentAlert}>Em desenvolvimento !</Text>;
  }

  return (
    <SafeAreaView style={styles.page}>
      <ModalMessage title={message} isOpened={!!message.trim()} closeModal={() => setMessage('')} />

      <ScrollView style={[styles.card, { backgroundColor }]}>
        <CustomInput value={title} onChangeText={(text) => seTitle(text)} label='Título' />

        <View style={[styles.citiesList, { backgroundColor }]}>
          {Cities.map((label) => (
            <CustomCheckBox label={label} changeChecked={(isChecked) => checkCity(label, isChecked)} />
          ))}
        </View>

        <View style={[styles.medias, { backgroundColor, justifyContent }]}>
          {medias.map((media) => (
            <Image source={{ uri: media }} style={styles.image} />
          ))}

          <TouchableOpacity onPress={handleAddMedia} style={styles.addItem}>
            <Text style={[styles.addText, { color }]}>Adicionar Foto / Video</Text>
          </TouchableOpacity>
        </View>

        <Button onPress={handlePublish} title='Publicar' />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScreenNewPost;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 8,
  },

  citiesList: {
    marginVertical: 24,
  },

  developmentAlert: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 'auto',
  },

  medias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  image: {
    width: '30%',
    borderRadius: 8,
    height: 150,
  },

  addItem: {
    borderRadius: 8,
    height: 150,
    backgroundColor: Colors.light.tabIconDefault,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  addText: {
    textAlign: 'center',
  },
});
