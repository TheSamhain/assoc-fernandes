import { useLocalSearchParams, useNavigation } from 'expo-router';
import { child, get, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, useColorScheme } from 'react-native';

import KyusList from '../../../../assets/data/kyus.json';
import NewKataCard from '../../../../components/editarKatas/NewKataCard';
import { SafeAreaView } from '../../../../components/Themed';
import Colors from '../../../../constants/Colors';
import { KataVideoProps } from '../../../../interfaces/KatasProps';
import { getContrastingTextColor } from '../../../../utils/Colors';
import { firebaseDatabase } from '../../../../utils/firebaseConfig';

const ScreenEditKyu = () => {
  const navigation = useNavigation();
  const theme = useColorScheme() ?? 'light';
  const { kyu } = useLocalSearchParams<{ kyu: string }>();

  const [videos, setVideos] = useState<KataVideoProps[]>([]);

  useEffect(() => {
    const dbRef = ref(firebaseDatabase);
    get(child(dbRef, 'katas/' + kyu)).then((snapshot) => {
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

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={videos}
        renderItem={({ item, index }) => <NewKataCard kyu={Number(kyu)} {...item} />}
        keyExtractor={(item, index) => `${item.nome}_${index}`}
        style={styles.container}
        ListEmptyComponent={<ActivityIndicator style={styles.load} size='large' color={Colors[theme].text} />}
      />
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
});
