import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/Colors';
import { FaixaGroupProps } from '../../interfaces/FaixaGroupProps';

const ChipGroup: React.FC<FaixaGroupProps> = (kyu) => {
  return (
    <View
      style={{
        ...styles.chip,
        backgroundColor: kyu.cor,
      }}
    >
      <Text
        style={{
          ...styles.chipText,
          color: kyu.fonteEscura ? Colors.light.text : Colors.dark.text,
        }}
      >
        {kyu.faixa}
      </Text>

      {kyu.pontaPreta && <View style={styles.pontaPreta} />}
    </View>
  );
};

export default ChipGroup;

const styles = StyleSheet.create({
  chip: {
    borderRadius: 10,
    flexDirection: 'row',
  },
  chipText: {
    padding: 10,
    fontSize: 20,
    flex: 1,
  },
  pontaPreta: {
    backgroundColor: '#000000',
    width: '30%',
    height: '100%',
    borderTopEndRadius: 10,
    borderEndEndRadius: 10,
  },
});
