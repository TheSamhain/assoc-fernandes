import { useLocalSearchParams, useNavigation } from 'expo-router';
import { child, get, ref } from 'firebase/database';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, useColorScheme, ViewStyle } from 'react-native';

import Kyus from '../../../assets/data/kyus.json';
import { Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import { ExameData } from '../../../interfaces/ExameData';
import { getContrastingTextColor } from '../../../utils/Colors';
import { firebaseDatabase } from '../../../utils/firebaseConfig';

const ExameFaixaDetalhes = () => {
  const theme = useColorScheme() ?? 'light';
  const navigation = useNavigation();

  const pageStyle: ViewStyle = {
    backgroundColor: Colors[theme].cardBackground,
  };

  const { kyu } = useLocalSearchParams<{ kyu: string }>();

  const [exameData, setExameData] = useState<ExameData[]>([]);

  useEffect(() => {
    const dbRef = ref(firebaseDatabase);
    get(child(dbRef, 'exame')).then((snapshot) => {
      if (snapshot.exists()) {
        const exameDB = snapshot.val();

        setExameData(exameDB);
      }
    });

    const itemKyu = Kyus.find((item) => item.kyu === Number(kyu));

    const title = itemKyu ? itemKyu.faixa : 'Detalhes';
    const cor = itemKyu ? itemKyu.cor : '#000000';

    navigation.setOptions({
      title,
      headerTintColor: getContrastingTextColor(cor),
      headerStyle: {
        backgroundColor: cor,
      },
    });
  }, []);

  const data = useMemo(
    () =>
      exameData
        .sort((a, b) => b.kyu - a.kyu)
        .reduce(
          (acc, cur) => {
            if (cur.kyu < Number(kyu)) {
              return acc;
            }

            if (cur.bunkai) {
              acc.bunkai.push(...cur.bunkai);
            }

            if (cur.geri) {
              acc.geri.push(...cur.geri);
            }

            if (cur.kata) {
              acc.kata.push(...cur.kata);
            }

            if (cur.tsuki) {
              acc.tsuki.push(...cur.tsuki);
            }

            if (cur.uke) {
              acc.uke.push(...cur.uke);
            }

            if (cur.kyu === Number(kyu)) {
              acc.kyu = Number(kyu);
            }

            return acc;
          },
          {
            bunkai: [],
            geri: [],
            kata: [],
            kyu: 10,
            tsuki: [],
            uke: [],
          },
        ),
    [exameData],
  );

  if (!data) {
    return (
      <View style={loadStyles.loadingPage}>
        <ActivityIndicator color={Colors[theme].tint} size='large' />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.page, pageStyle]}>
      <Text style={[styles.title, { marginTop: 0 }]}>Uke (Defesa)</Text>
      {!data || !data.uke.length ? (
        <ActivityIndicator size='large' color={Colors[theme].text} />
      ) : (
        data.uke.map((item) => (
          <Text style={styles.data} key={item.nome}>
            <Text style={styles.dataName}>{item.nome}</Text>: {item.descricao}
          </Text>
        ))
      )}

      <Text style={styles.title}>Tsuki (Soco)</Text>
      {!data || !data.tsuki.length ? (
        <ActivityIndicator size='large' color={Colors[theme].text} />
      ) : (
        data.tsuki.map((item) => (
          <Text style={styles.data} key={item.nome}>
            <Text style={styles.dataName}>{item.nome}</Text>: {item.descricao}
          </Text>
        ))
      )}

      <Text style={styles.title}>Geri (Chute)</Text>
      {!data || !data.geri.length ? (
        <ActivityIndicator size='large' color={Colors[theme].text} />
      ) : (
        data.geri.map((item) => (
          <Text style={styles.data} key={item.nome}>
            <Text style={styles.dataName}>{item.nome}</Text>: {item.descricao}
          </Text>
        ))
      )}

      <Text style={styles.title}>Katas</Text>
      {!data || !data.kata.length ? (
        <ActivityIndicator size='large' color={Colors[theme].text} />
      ) : (
        data.kata.map((item) => (
          <Text style={styles.data} key={item}>
            {item}
          </Text>
        ))
      )}

      {data.bunkai && data.bunkai.length ? (
        <>
          <Text style={styles.title}>Bunkai</Text>
          {data.bunkai.map((item) => (
            <Text style={styles.data} key={item}>
              {item}
            </Text>
          ))}
        </>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

export default ExameFaixaDetalhes;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 16,
  },

  title: {
    marginTop: 24,
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 24,
  },

  data: {
    marginLeft: 16,
    marginBottom: 16,
  },
  dataName: {
    fontWeight: 'bold',
  },
});

const loadStyles = StyleSheet.create({
  loadingPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
