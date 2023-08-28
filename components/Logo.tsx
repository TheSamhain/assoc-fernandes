import { Link } from 'expo-router';
import React from 'react';
import { Image, ImageStyle, StyleSheet, useColorScheme } from 'react-native';

import AssocLogoDark from '../assets/images/logo-karate-dark.png';
import AssocLogoLight from '../assets/images/logo-karate.png';

const Logo = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const imageSize = 50;

  const logoStyle: ImageStyle = { height: imageSize, width: imageSize };

  return (
    <Link href='/' style={styles.logoContainer}>
      <Image source={colorScheme === 'dark' ? AssocLogoDark : AssocLogoLight} style={logoStyle} />
    </Link>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoContainer: {
    padding: 5,
  },
});
