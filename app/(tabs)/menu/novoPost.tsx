import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const ScreenNewPost = () => {
  return (
    <SafeAreaView style={styles.page}>
      <Text>ScreenNewPost</Text>
    </SafeAreaView>
  );
};

export default ScreenNewPost;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
