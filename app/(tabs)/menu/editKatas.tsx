import { child, onValue, push, ref, set } from 'firebase/database';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, useColorScheme, View } from 'react-native';

import NewKataCard from '../../../components/editKatas/NewKataCard';
import { SafeAreaView } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import { KEY_KATAS } from '../../../constants/Database';
import { KataVideoProps } from '../../../interfaces/KatasProps';
import { firebaseDatabase } from '../../../utils/firebaseConfig';

const ScreenEditKatas = () => {
  const theme = useColorScheme() ?? 'light';

  const scrollRef = useRef<FlatList>(null);

  const [videos, setVideos] = useState<KataVideoProps[]>([]);

  useEffect(() => {
    const dbRef = ref(firebaseDatabase, KEY_KATAS);

    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const videos: KataVideoProps[] = [];

        snapshot.forEach((item) => {
          const video = item.val();
          videos.push({ ...video, uuid: item.key });
        });

        setVideos(videos);
      } else {
        setVideos([]);
      }
    });
  }, []);

  const addItem = () => {
    const dbRef = ref(firebaseDatabase);

    const kataId = push(child(dbRef, KEY_KATAS)).key;

    set(ref(firebaseDatabase, `${KEY_KATAS}/${kataId}`), {
      nome: '',
      video: 'https://www.youtube.com/embed/',
    });

    if (scrollRef.current) {
      scrollRef.current.scrollToEnd();
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={videos}
        renderItem={({ item, index }) => <NewKataCard {...item} />}
        keyExtractor={(item, index) => `${item.nome}_${index}`}
        style={styles.container}
        ListEmptyComponent={<ActivityIndicator style={styles.load} size='large' color={Colors[theme].text} />}
        ref={scrollRef}
      />

      <View style={styles.buttonContainer}>
        <Button title='Adicionar' onPress={addItem} />
      </View>
    </SafeAreaView>
  );
};

export default ScreenEditKatas;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
  },

  load: {
    marginVertical: '50%',
  },

  buttonContainer: {
    padding: 8,
  },
});
