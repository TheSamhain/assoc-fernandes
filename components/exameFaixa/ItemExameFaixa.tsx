import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, ViewStyle, View, TouchableOpacity } from 'react-native';

import { ExameAndKyuProps } from '../../interfaces/ExameData';
import { Text } from '../Themed';

const ItemExameFaixa: React.FC<ExameAndKyuProps> = ({ faixa, cor, fonteEscura }) => {
  const containerStyle: ViewStyle = {
    backgroundColor: cor,
  };

  const color = fonteEscura ? DefaultTheme.colors.text : DarkTheme.colors.text;

  return (
    <TouchableOpacity style={[styles.item, containerStyle]}>
      <View style={styles.icon}>
        <MaterialCommunityIcons size={40} name='information' color={color} />
      </View>
      <Text style={[styles.title, { color }]}>{faixa}</Text>
    </TouchableOpacity>
  );
};

export default ItemExameFaixa;

const styles = StyleSheet.create({
  item: {
    width: 100,
    height: 120,
    borderRadius: 8,
    margin: 8,
    padding: 8,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  icon: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    flex: 1,
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
  },
});
