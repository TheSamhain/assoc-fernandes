import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  ScrollViewBase,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import CustomCheckBox from '../../../components/CustomCheckBox';
import CustomInput from '../../../components/CustomInput';
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

  const handlePublish = () => {};

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

  if (!__DEV__) {
    return <Text style={styles.developmentAlert}>Em desenvolvimento !</Text>;
  }

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView style={[styles.card, { backgroundColor }]}>
        <CustomInput value={title} onChangeText={(text) => seTitle(text)} label='Título' />

        <View style={[styles.citiesList, { backgroundColor }]}>
          {Cities.map((label) => (
            <CustomCheckBox label={label} changeChecked={(isChecked) => checkCity(label, isChecked)} />
          ))}
        </View>

        <View style={[styles.medias, { backgroundColor }]}>
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
    justifyContent: 'space-between',
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
