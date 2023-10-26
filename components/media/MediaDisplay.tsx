import { ResizeMode, Video } from 'expo-av';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

import { blurHash, mimeTypes } from '../../constants/General';

interface MediaDisplayProps {
  url: string;
}

const MediaDisplay: React.FC<MediaDisplayProps> = ({ url }) => {
  const objURL = new URL(url);
  const urlParts = objURL.pathname.split('/');
  const lastPart = urlParts.pop() || 'jpg';
  const extParts = lastPart.split('.');
  const ext = extParts.pop() || 'jpg';

  const type = mimeTypes[ext as keyof typeof mimeTypes];

  if (type.includes('video')) {
    return (
      <Video
        videoStyle={styles.video}
        style={styles.image}
        source={{ uri: url }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
    );
  }

  return <Image style={styles.image} source={url} placeholder={blurHash} contentFit='contain' />;
};

export default MediaDisplay;

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  video: {
    marginVertical: '40%',
    width: '100%',
  },
});
