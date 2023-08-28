import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-web-webview';
import { WebView as NativeWebView } from 'react-native-webview';

import { Text, View } from '../Themed';

interface KataVideoProps {
  kata: {
    nome: string;
    video: string;
  };
  cor: string;
}

const KataVideo: React.FC<KataVideoProps> = ({ kata, cor }) => {
  return (
    <View
      style={{
        ...styles.videoContainer,
        borderColor: cor,
      }}
    >
      {Platform.OS === 'web' ? (
        <WebView
          style={{ flex: 1 }}
          javaScriptEnabled
          source={{ uri: kata.video + '?rel=0&autoplay=0&showinfo=0&controls=1' }}
        />
      ) : (
        <NativeWebView
          style={{ flex: 1, width: '100%', height: '100%' }}
          javaScriptEnabled
          source={{ uri: kata.video + '?rel=0&autoplay=0&showinfo=0&controls=1' }}
        />
      )}
      <Text style={styles.title}>{kata.nome}</Text>
    </View>
  );
};

export default KataVideo;

const styles = StyleSheet.create({
  videoContainer: {
    backgroundColor: '#000000',
    marginVertical: 16,
    position: 'relative',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 8,
    height: 300,
    width: 500,
    maxWidth: '100%',
  },
  title: {
    backgroundColor: '#000000',
    width: '100%',
    textAlign: 'center',
    height: 40,
    paddingTop: 5,
    fontSize: 20,
  },
});
