import { child, get, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, useColorScheme } from 'react-native';

import Kyus from '../../assets/data/kyus.json';
import FaixaGroup from '../../components/katas/FaixaGroup';
import Colors from '../../constants/Colors';
import { FaixaGroupProps } from '../../interfaces/FaixaGroupProps';
import { KatasProps } from '../../interfaces/KatasProps';
import { firebaseDatabase } from '../../utils/firebaseConfig';

export default function TabKataScreen() {
  const theme = useColorScheme() ?? 'light';
  const [katasFaixas, setKatasFaixas] = useState<FaixaGroupProps[]>([]);

  useEffect(() => {
    const dbRef = ref(firebaseDatabase);
    get(child(dbRef, 'katas')).then((snapshot) => {
      if (snapshot.exists()) {
        const katas: KatasProps[] = snapshot.val();
        const katasParsed = katas.map((kata) => {
          const kyu = Kyus.find((kyuList) => kyuList.kyu === kata.kyu);

          if (!kyu) {
            return {
              ...kata,
              faixa: 'Branca',
              cor: '#FFFFFF',
              pontaPreta: false,
            };
          }

          return { ...kata, ...kyu };
        });

        setKatasFaixas(katasParsed);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={katasFaixas}
        renderItem={({ item }) => <FaixaGroup {...item} />}
        keyExtractor={(item, index) => `${item.kyu}_${index}`}
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
