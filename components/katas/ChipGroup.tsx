import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { KyuProps } from '../../interfaces/KyuProps';
import { getContrastingTextColor } from '../../utils/Colors';

interface ChipGroupProps extends KyuProps {
  onPress?: () => void | Promise<void>;
}

const ChipGroup: React.FC<ChipGroupProps> = (kyu) => {
  return (
    <TouchableOpacity
      onPress={kyu.onPress}
      style={{
        ...styles.chip,
        backgroundColor: kyu.cor,
      }}
      disabled={!kyu.onPress}
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
    </TouchableOpacity>
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
