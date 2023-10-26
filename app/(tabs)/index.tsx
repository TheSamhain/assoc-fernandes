import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Eventos from '../../assets/data/eventos.json';
import EventCard from '../../components/events/EventCard';
import { View } from '../../components/Themed';

export default function TabHomeScreen() {
  return (
    <View style={styles.page}>
      <ScrollView style={styles.container}>
        {Eventos.map((evento) => (
          <EventCard key={evento.nome + evento.data} evento={evento} />
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
