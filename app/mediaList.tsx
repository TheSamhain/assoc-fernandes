import { useLocalSearchParams, useNavigation } from 'expo-router';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View, useColorScheme } from 'react-native';

import EventMediaList from '../components/events/EventMediaList';
import Colors from '../constants/Colors';
import { firebaseStorage } from '../utils/firebaseConfig';

type ScreenMediaListParams = {
  nome: string;
  galeria: string;
};

const ScreenMediaList = () => {
  const navigation = useNavigation();
  const theme = useColorScheme() ?? 'light';

  const { nome, galeria } = useLocalSearchParams<ScreenMediaListParams>();
  const [medias, setMedias] = useState<(string | undefined)[]>([undefined, undefined, undefined, undefined]);

  useEffect(() => {
    const getMedias = async () => {
      setMedias([]);

      const imagesRef = ref(firebaseStorage, galeria);
      const listRef = await listAll(imagesRef);
      const { items } = listRef;

      const newMedias: string[] = [];

      for (const item of items) {
        const url = await getDownloadURL(item);
        newMedias.push(url);
      }

      setMedias(newMedias);
    };

    getMedias();
  }, []);

  useEffect(() => {
    const title = (nome || 'Media').replace(/_|\//g, ' ').replace(/\d/g, '').trim();
    navigation.setOptions({ title });
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        style={styles.container}
        data={medias}
        renderItem={({ item, index }) => (
          <EventMediaList
            nome={nome || 'Media'}
            galery={galeria || ''}
            key={galeria + (item || '') + index}
            media={item}
            index={index}
          />
        )}
        keyExtractor={(item, index) => '' + item + index}
        ListEmptyComponent={<ActivityIndicator style={styles.load} size='large' color={Colors[theme].text} />}
      />
    </View>
  );
};

export default ScreenMediaList;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
  },

  load: {
    marginVertical: '50%',
  },
});
