import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import Data from '../../assets/data/exame.json';
import Kyus from '../../assets/data/kyus.json';
import { View } from '../../components/Themed';
import ItemExameFaixa from '../../components/exameFaixa/ItemExameFaixa';

const TabExameFaixa = () => {
  const dataKyu = Data.map((item) => {
    const kyu = Kyus.find((kyuItem) => kyuItem.kyu === item.kyu);

    if (!kyu) {
      return {
        ...item,
        faixa: 'Branca',
        cor: '#FFFFFF',
        fonteEscura: true,
        pontaPreta: false,
      };
    }

    return {
      ...item,
      ...kyu,
    };
  });

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.page}>
      <View style={styles.container}>
        {dataKyu.map((kyu) => (
          <ItemExameFaixa {...kyu} key={kyu.kyu} />
        ))}
      </View>
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
  },
});
