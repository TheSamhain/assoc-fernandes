import { ScrollView, StyleSheet } from 'react-native';

import Katas from '../../assets/data/katas.json';
import Kyus from '../../assets/data/kyus.json';
import { View } from '../../components/Themed';
import FaixaGroup from '../../components/katas/FaixaGroup';

export default function TabKataScreen() {
  const katasFaixas = Katas.map((kata) => {
    const kyu = Kyus.find((kyuList) => kyuList.kyu === kata.kyu);

    if (!kyu) {
      return {
        ...kata,
        faixa: 'Branca',
        cor: '#FFFFFF',
        fontDark: true,
        pontaPreta: false,
      };
    }

    return { ...kata, ...kyu };
  });

  return (
    <View style={styles.page}>
      <ScrollView style={styles.container}>
        {katasFaixas.map((kyu) => (
          <FaixaGroup kyu={kyu} key={kyu.kyu} />
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
