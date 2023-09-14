import { ScrollView, StyleSheet } from 'react-native';

import Data from '../../assets/data/katas.json';
import Kyus from '../../assets/data/kyus.json';
import { View } from '../../components/Themed';
import FaixaGroup from '../../components/katas/FaixaGroup';

export default function TabKataScreen() {
  const katasFaixas = Data.map((kata) => {
    const kyu = Kyus.find((kyuList) => kyuList.kyu === kata.kyu);

    if (!kyu) {
      return {
        ...kata,
        faixa: 'Branca',
        cor: '#FFFFFF',
        fonteEscura: true,
        pontaPreta: false,
      };
    }

    return { ...kata, ...kyu };
  });

  return (
    <View style={styles.page}>
      <ScrollView style={styles.container}>
        {katasFaixas.map((item) => (
          <FaixaGroup {...item} key={item.kyu} />
        ))}
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
