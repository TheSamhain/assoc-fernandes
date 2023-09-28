import { useLocalSearchParams, useNavigation } from 'expo-router';
import { child, get, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, useColorScheme } from 'react-native';

import KyusList from '../../../../assets/data/kyus.json';
import NewKataCard from '../../../../components/editarKatas/NewKataCard';
import { SafeAreaView } from '../../../../components/Themed';
import Colors from '../../../../constants/Colors';
import { KatasProps, KataVideoProps } from '../../../../interfaces/KatasProps';
import { getContrastingTextColor } from '../../../../utils/Colors';
import { firebaseDatabase } from '../../../../utils/firebaseConfig';

const ScreenEditKyu = () => {
  const navigation = useNavigation();
  const theme = useColorScheme() ?? 'light';
  const { kyu } = useLocalSearchParams<{ kyu: string }>();

  const [videos, setVideos] = useState<KataVideoProps[]>([]);

  useEffect(() => {
    const dbRef = ref(firebaseDatabase);
    get(child(dbRef, 'katas')).then((snapshot) => {
      if (snapshot.exists()) {
        const katas: KatasProps[] = snapshot.val();

        for (const kata of katas) {
          if (kata.kyu !== Number(kyu)) {
            continue;
          }

          setVideos(kata.videos);
          break;
        }
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
        renderItem={({ item }) => <NewKataCard {...item} />}
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
