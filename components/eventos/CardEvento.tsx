import React from 'react';
import { Dimensions, StyleSheet, ViewStyle, useColorScheme } from 'react-native';

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
  const theme = useColorScheme() ?? 'light';
  const windowWidth = Dimensions.get('window').width;

  const background: ViewStyle = {
    backgroundColor: Colors[theme].cardBackground,
  };

  if (windowWidth <= 500) {
    background.borderRadius = 0;
  }

  return (
    <View style={[styles.card, background]}>
      <Text style={styles.title}>{evento.nome}</Text>
      <Text style={styles.description}>{evento.descricao}</Text>
      <Text style={styles.description}>{evento.data}</Text>
    </View>
  );
};

export default CardEvento;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 10,
    width: 500,
    maxWidth: '100%',

    height: 500,
    marginVertical: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
});
