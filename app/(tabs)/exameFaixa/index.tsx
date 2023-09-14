import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, ViewStyle, useColorScheme } from 'react-native';

import Kyus from '../../../assets/data/kyus.json';
import ItemExameFaixa from '../../../components/exameFaixa/ItemExameFaixa';

const TabExameFaixa = () => {
  const colorScheme = useColorScheme() ?? 'light';

  const pageStyle: ViewStyle = {
    backgroundColor: colorScheme === 'light' ? DefaultTheme.colors.card : DarkTheme.colors.card,
  };

  return (
    <ScrollView style={[styles.page, pageStyle]} contentContainerStyle={styles.container}>
      {Kyus.map((kyu) => (
        <ItemExameFaixa {...kyu} key={kyu.kyu} />
      ))}
    </ScrollView>
  );
};

export default TabExameFaixa;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
});
