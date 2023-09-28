import { useLocalSearchParams, useNavigation } from 'expo-router';
import { child, onValue, push, ref, set } from 'firebase/database';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, useColorScheme } from 'react-native';

import KyusList from '../../../../assets/data/kyus.json';
import NewKataCard from '../../../../components/editarKatas/NewKataCard';
import { SafeAreaView, View } from '../../../../components/Themed';
import Colors from '../../../../constants/Colors';
import { KataVideoProps } from '../../../../interfaces/KatasProps';
import { getContrastingTextColor } from '../../../../utils/Colors';
import { firebaseDatabase } from '../../../../utils/firebaseConfig';

const ScreenEditKyu = () => {
  const navigation = useNavigation();
  const theme = useColorScheme() ?? 'light';
  const { kyu } = useLocalSearchParams<{ kyu: string }>();

  const scrollRef = useRef<FlatList>(null);

  const [videos, setVideos] = useState<KataVideoProps[]>([]);

  useEffect(() => {
    const dbRef = ref(firebaseDatabase, 'katas/' + kyu);

    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const videos: KataVideoProps[] = [];

        snapshot.forEach((item) => {
          const video = item.val();
          videos.push({ ...video, uuid: item.key });
        });

        setVideos(videos);
      }
    });

    const itemKyu = KyusList.find((item) => item.kyu === Number(kyu));

    const title = itemKyu ? 'Editar Katas - ' + itemKyu.faixa : 'Editar faixa';
    const cor = itemKyu ? itemKyu.cor : '#000000';

    navigation.setOptions({
      title,
      headerTintColor: getContrastingTextColor(cor),
      headerStyle: { backgroundColor: cor },
    });
  }, []);

  const addItem = () => {
    const dbRef = ref(firebaseDatabase);

    const kataKey = 'katas/' + kyu;

    const kataId = push(child(dbRef, kataKey)).key;

    set(ref(firebaseDatabase, `${kataKey}/${kataId}`), {
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
        renderItem={({ item, index }) => <NewKataCard kyu={Number(kyu)} {...item} />}
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

export default ScreenEditKyu;

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
