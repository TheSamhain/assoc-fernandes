import { ScrollView, StyleSheet } from 'react-native';

import Katas from '../../assets/data/katas.json';
import { View } from '../../components/Themed';
import FaixaGroup from '../../components/katas/FaixaGroup';

export default function TabKataScreen() {
  return (
    <View style={styles.page}>
      <ScrollView style={styles.container}>
        {Katas.map((kyu) => (
          <FaixaGroup kyu={kyu} key={kyu.faixa} />
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
