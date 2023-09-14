import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, ActivityIndicator, useColorScheme, ViewStyle, ScrollView } from 'react-native';

import ExameData from '../../../assets/data/exame.json';
import { Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';

const ExameFaixaDetalhes = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const navigation = useNavigation();

  const pageStyle: ViewStyle = {
    backgroundColor: colorScheme === 'light' ? DefaultTheme.colors.card : DarkTheme.colors.card,
  };

  const { kyu, faixa, cor, fonteEscura } = useLocalSearchParams<{
    kyu: string;
    faixa: string;
    cor: string;
    fonteEscura: string;
  }>();

  const data = ExameData.find((item) => item.kyu === Number(kyu));

  useEffect(() => {
    const title = faixa || 'Detalhes';
    navigation.setOptions({
      title,
      headerTintColor: fonteEscura === 'true' ? DefaultTheme.colors.text : DarkTheme.colors.text,
      headerStyle: {
        backgroundColor: cor,
      },
    });
  }, []);

  if (!data) {
    return (
      <View style={loadStyles.loadingPage}>
        <ActivityIndicator color={Colors[colorScheme].tint} size='large' />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.page, pageStyle]}>
      <Text style={[styles.title, { marginTop: 0 }]}>Uke (Defesa)</Text>
      {data.uke.map((item) => (
        <Text style={styles.data}>
          <Text style={styles.dataName}>{item.nome}</Text>: {item.descricao}
        </Text>
      ))}

      <Text style={styles.title}>Tsuki (Soco)</Text>
      {data.tsuki.map((item) => (
        <Text style={styles.data}>
          <Text style={styles.dataName}>{item.nome}</Text>: {item.descricao}
        </Text>
      ))}

      <Text style={styles.title}>Geri (Chute)</Text>
      {data.geri.map((item) => (
        <Text style={styles.data}>
          <Text style={styles.dataName}>{item.nome}</Text>: {item.descricao}
        </Text>
      ))}

      <Text style={styles.title}>Katas</Text>
      {data.kata.map((item) => (
        <Text style={styles.data}>{item}</Text>
      ))}

      {data.bunkai && data.bunkai.length ? (
        <>
          <Text style={styles.title}>Bunkai</Text>
          {data.bunkai.map((item) => (
            <Text style={styles.data}>{item}</Text>
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
