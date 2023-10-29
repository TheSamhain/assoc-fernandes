import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, useColorScheme } from 'react-native';

import CustomCheckBox from '../../../components/CustomCheckBox';
import CustomInput from '../../../components/CustomInput';
import { View } from '../../../components/Themed';
import { Cities, City } from '../../../constants/Cities';
import Colors from '../../../constants/Colors';

const ScreenNewPost = () => {
  const theme = useColorScheme() ?? 'light';
  const backgroundColor = Colors[theme].text;

  const [title, seTitle] = useState('');

  const [selectedCities, setSelectedCities] = useState<City[]>([]);

  const checkCity = (city: City, isChecked: boolean) => {
    if (isChecked) {
      return setSelectedCities((old) => {
        if (old.includes(city)) {
          return old;
        }

        return [...old, city];
      });
    }

    setSelectedCities((old) => {
      const currentIndex = old.indexOf(city);

      if (currentIndex === -1) {
        return old;
      }

      old.splice(currentIndex, 1);
      return old;
    });
  };

  const handlePublish = () => {};

  return (
    <SafeAreaView style={styles.page}>
      <View style={[styles.card, { backgroundColor }]}>
        <CustomInput value={title} onChangeText={(text) => seTitle(text)} label='Título' />

        <View style={[styles.citiesList, { backgroundColor }]}>
          {Cities.map((label) => (
            <CustomCheckBox label={label} changeChecked={(isChecked) => checkCity(label, isChecked)} />
          ))}
        </View>

        <Button onPress={handlePublish} title='Publicar' />
      </View>
    </SafeAreaView>
  );
};

export default ScreenNewPost;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 8,
  },

  citiesList: {
    marginVertical: 24,
  },
});
