import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageStyle, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import { Text } from './Themed';
import AssocLogoDark from '../assets/images/logo-karate-dark.png';
import AssocLogoLight from '../assets/images/logo-karate.png';

const Logo = () => {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const imageSize = 50;

  const logoStyle: ImageStyle = { height: imageSize, width: imageSize };

  return (
    <TouchableOpacity onPress={() => router.replace('/')} style={styles.logoContainer}>
      <Text style={styles.title}>AFK</Text>
      <Image source={colorScheme === 'dark' ? AssocLogoDark : AssocLogoLight} style={logoStyle} />
    </TouchableOpacity>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginRight: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
