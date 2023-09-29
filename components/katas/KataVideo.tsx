import { DarkTheme } from '@react-navigation/native';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { WebView } from 'react-native-web-webview';

import { Text, View } from '../Themed';

interface KataVideoProps {
  nome: string;
  video: string;
  uuid: string;
}

const KataVideo: React.FC<KataVideoProps> = ({ nome, video, uuid }) => {
  return (
    <View style={styles.videoContainer}>
      {Platform.OS === 'web' ? (
        <WebView
          style={{ flex: 1 }}
          javaScriptEnabled
          source={{ uri: video + '?rel=0&autoplay=0&showinfo=0&controls=1' }}
        />
      ) : (
        <></>
      )}
      <Text style={styles.title}>{nome}</Text>
    </View>
  );
};

export default KataVideo;

const styles = StyleSheet.create({
  videoContainer: {
    padding: 3,
    marginVertical: 16,
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 8,
    borderColor: '#7c7c7d',
    height: 300,
    width: 500,
    maxWidth: '100%',
  },
  title: {
    color: DarkTheme.colors.text,
    backgroundColor: '#000000',
    width: '100%',
    textAlign: 'center',
    paddingBottom: 5,
    fontSize: 20,
  },
});
