import { child, get, onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, useColorScheme } from 'react-native';

import Kyus from '../../assets/data/kyus.json';
import KataVideo from '../../components/katas/KataVideo';
import Colors from '../../constants/Colors';
import { KEY_KATAS } from '../../constants/Database';
import { FaixaGroupProps } from '../../interfaces/FaixaGroupProps';
import { KataVideoProps } from '../../interfaces/KatasProps';
import { firebaseDatabase } from '../../utils/firebaseConfig';

export default function TabKataScreen() {
  const theme = useColorScheme() ?? 'light';
  const [katasFaixas, setKatasFaixas] = useState<FaixaGroupProps[]>([]);

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

        const videosFiltered = videos.filter(
          (video) => video.nome.trim() && video.video.replace('https://www.youtube.com/embed/', ''),
        );
        setVideos(videosFiltered);
      } else {
        setVideos([]);
      }
    });
  }, []);

  useEffect(() => {
    const dbRef = ref(firebaseDatabase);

    get(child(dbRef, KEY_KATAS)).then((snapshot) => {
      if (snapshot.exists()) {
        const katasParsed: FaixaGroupProps[] = [];

        snapshot.forEach((kyuDB) => {
          const videos: KataVideoProps[] = [];

          kyuDB.forEach((item) => {
            const video = item.val();
            videos.push({ ...video, uuid: item.key });
          });

          const kyu = Kyus.find((kyuList) => kyuList.kyu === Number(kyuDB.key));

          if (!kyu) {
            katasParsed.push({
              videos,
              faixa: 'Branca',
              cor: '#FFFFFF',
              pontaPreta: false,
              kyu: 0,
            });
          } else {
            katasParsed.push({ videos, ...kyu });
          }
        });

        setKatasFaixas(katasParsed);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={videos}
        renderItem={({ item }) => <KataVideo {...item} />}
        keyExtractor={(item, index) => `${item.uuid}_${index}`}
        style={styles.container}
        ListEmptyComponent={<ActivityIndicator style={styles.load} size='large' color={Colors[theme].text} />}
      />
    </SafeAreaView>
  );
}

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
