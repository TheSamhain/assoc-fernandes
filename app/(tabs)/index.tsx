import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, useColorScheme } from 'react-native';

import { View } from '../../components/Themed';
import EventCard from '../../components/events/EventCard';
import Colors from '../../constants/Colors';
import { KEY_EVENTOS } from '../../constants/Database';
import { EventoProps } from '../../interfaces/EventoProps';
import { firebaseDatabase } from '../../utils/firebaseConfig';

export default function TabHomeScreen() {
  const theme = useColorScheme() ?? 'light';
  const [postList, setPostList] = useState<EventoProps[]>([]);

  useEffect(() => {
    const dbRef = ref(firebaseDatabase, KEY_EVENTOS);

    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const posts: EventoProps[] = [];

        snapshot.forEach((item) => {
          const post = item.val();
          posts.push(post);
        });

        posts.reverse();
        setPostList(posts);
      } else {
        setPostList([]);
      }
    });
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        style={styles.container}
        data={postList}
        renderItem={({ item }) => <EventCard key={item.nome + item.data} {...item} />}
        ListEmptyComponent={<ActivityIndicator style={styles.load} size='large' color={Colors[theme].text} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
  },

  load: {
    marginVertical: '50%',
  },
});
