import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { blurHash } from '../constants/General';

type ScreenMediaParams = {
  galery: string;
  media: string;
  index: string;
};

const ScreenMedia = () => {
  const navigation = useNavigation();
  const { galery, media, index } = useLocalSearchParams<ScreenMediaParams>();
  const decodedUrl = atob(media || '');

  useEffect(() => {
    const title = (galery || 'Media').replace(/_|\//g, ' ').replace(/\d/g, '').trim();
    navigation.setOptions({ title });
  }, [media, index]);

  return (
    <View style={styles.page}>
      <Image style={styles.image} source={decodedUrl} placeholder={blurHash} contentFit='contain' />
      <MaterialCommunityIcons size={40} style={styles.lefIcon} color='#ffffff' name='chevron-left' />
      <MaterialCommunityIcons size={40} style={styles.rightIcon} color='#ffffff' name='chevron-right' />
    </View>
  );
};

export default ScreenMedia;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#000000',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    flex: 1,
  },
  lefIcon: {
    position: 'absolute',
    left: 0,
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
  },
});
