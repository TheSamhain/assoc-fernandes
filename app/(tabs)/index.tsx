import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Eventos from '../../assets/data/eventos.json';
import { Text, View } from '../../components/Themed';
import CardEvento from '../../components/eventos/CardEvento';

export default function TabHomeScreen() {
  return (
    <View style={styles.page}>
      <ScrollView style={styles.container}>
        {Eventos.map((evento) => (
          <CardEvento key={evento.nome} evento={evento} />
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});