import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FaixaGroupProps } from '../../interfaces/FaixaGroupProps';
import { getContrastingTextColor } from '../../utils/Colors';

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
          color: getContrastingTextColor(kyu.cor),
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
