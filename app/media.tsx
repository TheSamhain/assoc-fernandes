import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
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

  return (
    <View style={styles.page}>
      <MediaDisplay url={decodedUrl} />

      {previousMedia ? (
        <MaterialCommunityIcons
          size={40}
          style={styles.lefIcon}
          color='#ffffff'
          name='chevron-left'
          onPress={() =>
            router.push({
              pathname: 'media',
              params: {
                galery,
                media: btoa(previousMedia || ''),
                index: numIndex - 1,
              },
            })
          }
        />
      ) : (
        <></>
      )}

      {nextMedia ? (
        <MaterialCommunityIcons
          onPress={() =>
            router.push({
              pathname: 'media',
              params: {
                galery,
                media: btoa(nextMedia || ''),
                index: numIndex + 1,
              },
            })
          }
          size={40}
          style={styles.rightIcon}
          color='#ffffff'
          name='chevron-right'
        />
      ) : (
        <></>
      )}
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

  lefIcon: {
    position: 'absolute',
    left: 0,
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
  },
});
