import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../../constants/Colors';
import { blurHash, mimeTypes } from '../../constants/General';
import { Text, View } from '../Themed';

interface EventMediaProps {
  nome: string;
  galeria: string;
  media: string | undefined;
  index: number;
  plusItems?: number;
}

const EventMedia: React.FC<EventMediaProps> = ({ nome, galeria, media, index, plusItems }) => {
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
              pathname: 'mediaList',
              params: {
                galeria,
                nome,
              },
            })
      }
    >
      {mediaType.includes('video') ? (
        <>
          <Video
            ref={(component) => component && _handleVideoRef(component)}
            style={styles.image}
            source={media ? { uri: media } : undefined}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={false}
            isMuted
            focusable={false}
          />

          <MaterialCommunityIcons
            name='play-circle-outline'
            color={Colors.light.background}
            size={64}
            style={styles.videoPlayIcon}
          />
        </>
      ) : (
        <Image
          cachePolicy='memory-disk'
          style={styles.image}
          source={media}
          placeholder={blurHash}
          contentFit='cover'
        />
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

  videoPlayIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
  },
});
