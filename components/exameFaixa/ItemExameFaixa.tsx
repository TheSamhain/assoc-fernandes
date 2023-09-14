import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, ViewStyle, View, TouchableOpacity } from 'react-native';

import { KyuProps } from '../../interfaces/KyuProps';
import { Text } from '../Themed';

interface KyuIconsProps {
  [key: string]: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
}

const kyuIcons: KyuIconsProps = {
  '9': 'circle-medium',
  '8': 'ray-start-end',
  '7': 'ray-start-vertex-end',
  '6': 'chevron-up',
  '5': 'chevron-double-up',
  '4': 'chevron-triple-up',
  '3': 'star-half-full',
  '2': 'star',
  '1': 'shield-star-outline',
  '0': 'school',
  '-1': 'school',
};

const ItemExameFaixa: React.FC<KyuProps> = ({ kyu, faixa, cor, fonteEscura, pontaPreta }) => {
  const router = useRouter();

  const containerStyle: ViewStyle = {
    backgroundColor: cor,
    borderWidth: 8,
    borderColor: pontaPreta ? '#000000' : cor,
  };

  const color = fonteEscura ? DefaultTheme.colors.text : DarkTheme.colors.text;

  return (
    <TouchableOpacity
      style={[styles.item, containerStyle]}
      onPress={() =>
        router.push({
          pathname: 'exameFaixa/detalhes',
          params: {
            kyu,
            faixa,
            cor,
            fonteEscura,
          },
        })
      }
    >
      <View style={styles.icon}>
        <MaterialCommunityIcons size={40} name={kyuIcons[kyu] || 'star'} color={color} />
      </View>

      <Text style={[styles.title, { color }]}>{faixa.replace('ponta', 'p.')}</Text>
    </TouchableOpacity>
  );
};

export default ItemExameFaixa;

const styles = StyleSheet.create({
  item: {
    width: 110,
    height: 140,
    borderRadius: 8,
    margin: 4,
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