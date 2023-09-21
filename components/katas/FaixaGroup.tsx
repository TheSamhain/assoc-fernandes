import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ChipGroup from './ChipGroup';
import KataVideo from './KataVideo';
import { FaixaGroupProps } from '../../interfaces/FaixaGroupProps';
import { View } from '../Themed';

const FaixaGroup: React.FC<FaixaGroupProps> = (kyu) => {
  return (
    <View style={styles.kyuContainer}>
      <ChipGroup {...kyu} />

      <FlatList data={kyu.videos} renderItem={({ item }) => <KataVideo kata={item} cor={kyu.cor} />} />
    </View>
  );
};

export default FaixaGroup;

const styles = StyleSheet.create({
  kyuContainer: {
    padding: 16,
    alignSelf: 'center',
    maxWidth: '100%',
  },
});
