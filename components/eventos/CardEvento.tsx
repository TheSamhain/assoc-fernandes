import React from 'react';
import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import { Text, View } from '../Themed';

interface EventoProps {
  data: string;
  descricao: string;
  galeria: string;
  local: string;
  nome: string;
}

interface CardEventoProps {
  evento: EventoProps;
}

const CardEvento: React.FC<CardEventoProps> = ({ evento }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{evento.nome}</Text>
      <Text style={styles.description}>{evento.descricao}</Text>
      <Text style={styles.description}>{evento.data}</Text>
    </View>
  );
};

export default CardEvento;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#242526',
    padding: 10,
    borderRadius: 10,
    width: '60%',
    height: 500,
    margin: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
  },
  description: {},
});
