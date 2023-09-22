import { child, get, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, useColorScheme } from 'react-native';

import Kyus from '../../assets/data/kyus.json';
import { View } from '../../components/Themed';
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
    <View style={styles.page}>
      <ScrollView style={styles.container}>
        {katasFaixas.length ? (
          katasFaixas.map((item) => <FaixaGroup {...item} key={item.kyu} />)
        ) : (
          <ActivityIndicator size='large' color={Colors[theme].text} />
        )}
      </ScrollView>
    </View>
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
});
