import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { HandlerStateChangeEvent, PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import MediaDisplay from '../components/media/MediaDisplay';
import { firebaseStorage } from '../utils/firebaseConfig';

type ScreenMediaParams = {
  galery: string;
  media: string;
  index: string;
};

const ScreenMedia = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const { galery, media, index } = useLocalSearchParams<ScreenMediaParams>();
  const numIndex = Number(index);
  const decodedUrl = atob(media || '');

  const [previousMedia, setPreviousMedia] = useState('');
  const [nextMedia, setNextMedia] = useState('');

  useEffect(() => {
    const getNeighborMedias = async () => {
      setPreviousMedia('');
      setNextMedia('');

      if (!Number.isInteger(numIndex)) {
        return;
      }

      const imagesRef = ref(firebaseStorage, galery);

      const listRef = await listAll(imagesRef);
      const { items } = listRef;

      const previous = items[numIndex - 1];
      const next = items[numIndex + 1];

      if (previous) {
        const url = await getDownloadURL(previous);
        setPreviousMedia(url);
      }

      if (next) {
        const url = await getDownloadURL(next);
        setNextMedia(url);
      }
    };

    getNeighborMedias();

    const title = (galery || 'Media').replace(/_|\//g, ' ').replace(/\d/g, '').trim();
    navigation.setOptions({ title });
  }, [media, index]);

  const scale = useSharedValue(1);

  const handleNextMedia = () =>
    nextMedia
      ? router.push({
          pathname: 'media',
          params: {
            galery,
            media: btoa(nextMedia || ''),
            index: numIndex + 1,
          },
        })
      : null;

  const handlePreviousMedia = () =>
    previousMedia
      ? router.push({
          pathname: 'media',
          params: {
            galery,
            media: btoa(previousMedia || ''),
            index: numIndex - 1,
          },
        })
      : null;

  const onPan = (event: HandlerStateChangeEvent<Record<string, unknown>>) => {
    const { nativeEvent } = event;

    const translationX: number = nativeEvent.translationX as number;
    const translationY: number = nativeEvent.translationY as number;

    if (Math.abs(translationY) > 50 || Math.abs(translationX) < 50) {
      return;
    }

    const sideLeft = translationX < 0;

    if (sideLeft) {
      handleNextMedia();
      return;
    }

    handlePreviousMedia();
  };

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if (scale.value > 1) {
        scale.value = 1;
      } else {
        scale.value = scale.value * 2;
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <PanGestureHandler onEnded={onPan}>
      <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
        <Animated.View style={[styles.page, animatedStyle]}>
          <MediaDisplay url={decodedUrl} />

          {previousMedia ? (
            <MaterialCommunityIcons
              size={40}
              style={styles.lefIcon}
              color='#ffffff'
              name='chevron-left'
              onPress={handlePreviousMedia}
            />
          ) : (
            <></>
          )}

          {nextMedia ? (
            <MaterialCommunityIcons
              onPress={handleNextMedia}
              size={40}
              style={styles.rightIcon}
              color='#ffffff'
              name='chevron-right'
            />
          ) : (
            <></>
          )}
        </Animated.View>
      </TapGestureHandler>
    </PanGestureHandler>
  );
};

export default ScreenMedia;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#000000',
    flex: 1,
    justifyContent: 'center',
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
