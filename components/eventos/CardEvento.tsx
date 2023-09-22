import { listAll, ref, getDownloadURL } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, ViewStyle, useColorScheme } from 'react-native';

import MediaEvento from './MediaEvento';
import Colors from '../../constants/Colors';
import { firebaseStorage } from '../../utils/firebaseConfig';
import { Text, View } from '../Themed';

interface EventoProps {
  data: string;
  descricao: string;
  galeria: string;
  local: string[];
  nome: string;
}

interface CardEventoProps {
  evento: EventoProps;
}

const CardEvento: React.FC<CardEventoProps> = ({ evento }) => {
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

      const imagesRef = ref(firebaseStorage, evento.galeria);
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
      <Text style={styles.title}>{evento.nome}</Text>
      <Text style={styles.description}>{evento.descricao}</Text>
      <Text style={styles.description}>{evento.data}</Text>

      <View style={styles.medias}>
        {medias.map((media, index) => (
          <MediaEvento
            galery={evento.galeria}
            plusItems={plusMedias}
            key={evento.galeria + (media || '') + index}
            media={media}
            index={index}
          />
        ))}
      </View>
    </View>
  );
};

export default CardEvento;

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
