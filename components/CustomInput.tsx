import React from 'react';
import { StyleSheet, TextInput, ViewStyle, useColorScheme } from 'react-native';

import { Text, View } from './Themed';
import Colors from '../constants/Colors';

interface CustomInputProps {
  containerStyle?: ViewStyle;
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, value, onChangeText, containerStyle }) => {
  const theme = useColorScheme() ?? 'light';
  const color = Colors[theme].background;
  const backgroundColor = Colors[theme].text;

  return (
    <View style={[containerStyle, { backgroundColor }]}>
      <Text style={[styles.label, { color }]}>{label}</Text>

      <TextInput style={[styles.input, { color }]} value={value} onChangeText={(text) => onChangeText(text)} />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    marginLeft: 10,
    borderBottomWidth: 1,
    fontSize: 16,
  },
});
