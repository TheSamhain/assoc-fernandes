import { ResizeMode, Video } from 'expo-av';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { blurHash, mimeTypes } from '../../constants/General';
import { Text, View } from '../Themed';

interface EventMediaProps {
  galery: string;
  media: string | undefined;
  index: number;
  plusItems?: number;
}

const EventMedia: React.FC<EventMediaProps> = ({ galery, media, index, plusItems }) => {
  const router = useRouter();

  const mediaType = useMemo(() => {
    if (!media) {
      return 'image/jpeg';
    }

    const objURL = new URL(media);
    const urlParts = objURL.pathname.split('/');
    const lastPart = urlParts.pop() || 'jpg';
    const extParts = lastPart.split('.');
    const ext = extParts.pop() || 'jpg';
    const type = mimeTypes[ext as keyof typeof mimeTypes];

    return type;
  }, []);

  const _handleVideoRef = (component: Video) => {
    const playbackObject = component;
    playbackObject.playFromPositionAsync(2000);
    playbackObject.pauseAsync();
  };

  return (
    <TouchableOpacity
      style={styles.media}
      onPress={() =>
        !media
          ? null
          : router.push({
              pathname: 'media',
              params: {
                galery,
                media: btoa(media || ''),
                index,
              },
            })
      }
    >
      {mediaType.includes('video') ? (
        <Video
          ref={(component) => component && _handleVideoRef(component)}
          videoStyle={styles.video}
          style={styles.image}
          source={media ? { uri: media } : undefined}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={false}
          isMuted
          focusable={false}
        />
      ) : (
        <Image style={styles.image} source={media} placeholder={blurHash} contentFit='cover' />
      )}
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

export default EventMedia;

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

  video: {},
});
