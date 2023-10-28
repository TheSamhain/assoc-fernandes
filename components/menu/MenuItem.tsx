import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import { Text } from '../Themed';

interface MenuItemProps {
  title: string;
  route: 'editarKatas' | 'novoPost';
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
}

const MenuItem: React.FC<MenuItemProps> = ({ title, route, icon }) => {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';

  return (
    <TouchableOpacity style={styles.item} onPress={() => router.push({ pathname: `menu/${route}` })}>
      <MaterialCommunityIcons size={28} name={icon} color={Colors[theme].text} />
      <Text style={styles.itemText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
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
