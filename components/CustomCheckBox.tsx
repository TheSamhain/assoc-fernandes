import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';

interface CustomCheckBoxProps {
  label: string;
  changeChecked: (value: boolean) => void;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ label, changeChecked }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.section}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={(value) => {
          setIsChecked(value);
          changeChecked(value);
        }}
        color={isChecked ? Colors.dark.tint : undefined}
      />
      <Text style={styles.paragraph}>{label}</Text>
    </View>
  );
};

export default CustomCheckBox;

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
    height: 24,
    width: 24,
  },
});
