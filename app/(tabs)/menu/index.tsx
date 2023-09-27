import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import { Text, SafeAreaView } from '../../../components/Themed';
import Colors from '../../../constants/Colors';

const ScreenMenu = () => {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';

  return (
    <SafeAreaView style={styles.page}>
      <TouchableOpacity style={styles.item} onPress={() => router.push({ pathname: 'menu/editarKatas' })}>
        <MaterialCommunityIcons size={28} name='karate' color={Colors[theme].text} />
        <Text style={styles.itemText}>Editar Katas</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ScreenMenu;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  item: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    marginLeft: 8,
    fontSize: 16,
  },
});
