import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, useColorScheme, View } from 'react-native';

import KyuList from '../../../../assets/data/kyus.json';
import ChipGroup from '../../../../components/katas/ChipGroup';
import { SafeAreaView } from '../../../../components/Themed';
import Colors from '../../../../constants/Colors';

const ScreenEditarKatas = () => {
  const theme = useColorScheme() ?? 'light';
  const router = useRouter();

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={KyuList}
        renderItem={({ item }) => (
          <View style={styles.itemList}>
            <ChipGroup {...item} onPress={() => router.push({ pathname: 'menu/editarKatas/' + item.kyu })} />
          </View>
        )}
        keyExtractor={(item, index) => `${item.kyu}_${index}`}
        style={styles.container}
        ListEmptyComponent={<ActivityIndicator style={styles.load} size='large' color={Colors[theme].text} />}
      />
    </SafeAreaView>
  );
};

export default ScreenEditarKatas;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  itemList: {
    padding: 16,
    marginBottom: 8,
    width: 500,
    maxWidth: '100%',
  },
  load: {
    marginVertical: '50%',
  },
});
