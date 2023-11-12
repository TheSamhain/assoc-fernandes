import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { child, push, ref as refDB, set } from 'firebase/database';
import { ref as refStorage, UploadResult, uploadString } from 'firebase/storage';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import CustomCheckBox from '../../../components/CustomCheckBox';
import CustomInput from '../../../components/CustomInput';
import ModalMessage from '../../../components/ModalMessage';
import { Text, View } from '../../../components/Themed';
import { Cities, City } from '../../../constants/Cities';
import Colors from '../../../constants/Colors';
import { KEY_EVENTOS } from '../../../constants/Database';
import { mimeTypeToExtension } from '../../../utils/Files';
import { firebaseDatabase, firebaseStorage } from '../../../utils/firebaseConfig';
import { getTodayBR } from '../../../utils/Strings';

const ScreenNewPost = () => {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';
  const backgroundColor = Colors[theme].text;
  const color = Colors[theme].background;

  const [title, setTitle] = useState('');
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [medias, setMedias] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

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

  const handlePublish = async () => {
    if (!title.trim()) {
      return setMessage('Digite o título da publicação');
    }

    if (!selectedCities.length) {
      return setMessage('Selecione ao menos uma cidade');
    }

    if (!medias.length) {
      return setMessage('Inclua pelo menos uma foto ou vídeo');
    }

    setIsPublishing(true);

    try {
      const timeStamp = new Date().getTime();
      const folderName = KEY_EVENTOS + '/' + timeStamp;
      const folderPath = folderName + '/';

      let index = 1;

      const mediaPromiseList: Promise<UploadResult>[] = [];

      for (const media of medias) {
        const regExpArr = /data:(.+);base64,/g.exec(media);

        if (!regExpArr) {
          continue;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, mimeType] = regExpArr;

        if (!mimeType) {
          continue;
        }

        const paddedIndex = String(index++).padStart(4, '0');
        const extension = mimeTypeToExtension(mimeType);
        const mediaPath = `${folderPath}${paddedIndex}.${extension}`;
        const mediaRef = refStorage(firebaseStorage, mediaPath);
        const mediaNoMimeType = media.replace(/data:(.+);base64,/g, '');

        const uploadPromise = uploadString(mediaRef, mediaNoMimeType, 'base64', {
          contentType: mimeType,
        });

        mediaPromiseList.push(uploadPromise);
      }

      await Promise.all(mediaPromiseList);
      const dbRef = refDB(firebaseDatabase);
      const eventoId = push(child(dbRef, KEY_EVENTOS)).key;

      await set(refDB(firebaseDatabase, `${KEY_EVENTOS}/${eventoId}`), {
        data: getTodayBR(),
        descricao: '',
        nome: title,
        local: selectedCities,
        galeria: folderName,
      });

      setTitle('');
      setSelectedCities([]);
      setMedias([]);
      setMessage('');

      router.replace('/(tabs)');
    } catch (error) {
      const newMessage = error instanceof Error ? error.message : 'Erro ao criar publicação';
      setMessage(newMessage);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleAddMedia = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setMedias((old) => [...old, ...result.assets.map(({ uri }) => uri)]);
    }
  };

  const justifyContent = medias.length >= 2 ? 'space-between' : 'flex-start';

  // if (!__DEV__) {
  //   return <Text style={styles.developmentAlert}>Em desenvolvimento !</Text>;
  // }

  return (
    <SafeAreaView style={styles.page}>
      <ModalMessage title={message} isOpened={!!message.trim()} closeModal={() => setMessage('')} />

      <ScrollView style={[styles.card, { backgroundColor }]}>
        <CustomInput value={title} onChangeText={(text) => setTitle(text)} label='Título' />

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

        {isPublishing ? <ActivityIndicator size='large' /> : <Button onPress={handlePublish} title='Publicar' />}
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
