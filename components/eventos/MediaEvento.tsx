import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { blurHash } from '../../constants/General';
import { Text, View } from '../Themed';

interface MediaEventoProps {
  media: string | undefined;
  index: number;
  plusItems?: number;
}

const MediaEvento: React.FC<MediaEventoProps> = ({ media, index, plusItems }) => {
  return (
    <TouchableOpacity style={styles.media}>
      <Image style={styles.image} source={media} placeholder={blurHash} contentFit='cover' />
      {index === 3 && plusItems ? (
        <View style={styles.overShadow}>
          <Text style={styles.plusText}>+{plusItems}</Text>
        </View>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

export default MediaEvento;

const styles = StyleSheet.create({
  media: {
    minWidth: 150,
    flex: 1,
  },
  image: {
    flex: 1,
    margin: 2,
  },
  overShadow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontSize: 50,
  },
});
