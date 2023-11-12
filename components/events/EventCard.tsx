import { getDownloadURL, listAll, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, useColorScheme, ViewStyle } from 'react-native';

import Colors from '../../constants/Colors';
import { EventoProps } from '../../interfaces/EventoProps';
import { firebaseStorage } from '../../utils/firebaseConfig';
import { Text, View } from '../Themed';
import EventMedia from './EventMedia';

const EventCard: React.FC<EventoProps> = ({ galeria, nome, data, descricao }) => {
  const [plusMedias, setPlusMedias] = useState(0);
  const [medias, setMedias] = useState<(string | undefined)[]>([undefined, undefined, undefined, undefined]);
  const theme = useColorScheme() ?? 'light';
  const windowWidth = Dimensions.get('window').width;

  const background: ViewStyle = {
    backgroundColor: Colors[theme].cardBackground,
  };

  if (windowWidth <= 500) {
    background.borderRadius = 0;
  }

  useEffect(() => {
    const getMedias = async () => {
      setMedias([undefined, undefined, undefined, undefined]);

      const imagesRef = ref(firebaseStorage, galeria);
      const listRef = await listAll(imagesRef);
      const { items } = listRef;

      setPlusMedias(items.length > 4 ? items.length - 4 : 0);

      const itemsSliced = items.slice(0, 4);

      const newMedias: string[] = [];

      for (const item of itemsSliced) {
        const url = await getDownloadURL(item);
        newMedias.push(url);
      }

      setMedias(newMedias);
    };

    getMedias();
  }, []);

  return (
    <View style={[styles.card, background]}>
      <Text style={styles.title}>{nome}</Text>
      <Text style={styles.description}>{descricao}</Text>
      <Text style={styles.description}>{data}</Text>

      <View style={styles.medias}>
        {medias.map((media, index) => (
          <EventMedia
            nome={nome}
            galery={galeria}
            plusItems={plusMedias}
            key={galeria + (media || '') + index}
            media={media}
            index={index}
          />
        ))}
      </View>
    </View>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 10,
    width: 500,
    maxWidth: '100%',

    height: 500,
    marginVertical: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },

  medias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    padding: 2,
  },
});
