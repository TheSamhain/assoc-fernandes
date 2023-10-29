import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, useColorScheme } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { SafeAreaView, Text, View } from '../../../components/Themed';
import MenuItem from '../../../components/menu/MenuItem';
import Colors from '../../../constants/Colors';

const ENCODED_PASS = 'QUZLIzEyMw==';
const DECODED_PASS = Buffer.from(ENCODED_PASS, 'base64').toString('utf8');
const STORAGE_KEY_USER = 'AUTH_USER';

const ScreenMenu = () => {
  const theme = useColorScheme() ?? 'light';

  const [userAuth, setUserAuth] = useState('');
  const [newPass, setNewPass] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEY_USER);
      const timestamp = Number(storedUser);

      if (!storedUser || !timestamp) {
        return AsyncStorage.clear();
      }

      const currentTimestamp = new Date().getTime();

      if (timestamp >= currentTimestamp) {
        return AsyncStorage.clear();
      }

      setUserAuth(DECODED_PASS);
    };

    loadData();
  }, []);

  const handleConfirm = async () => {
    setUserAuth(newPass);
    const currentTimestamp = new Date().getTime();
    AsyncStorage.setItem(STORAGE_KEY_USER, String(currentTimestamp));
  };

  if (userAuth.toUpperCase() !== DECODED_PASS) {
    return (
      <SafeAreaView style={[styles.page, stylesModal.background]}>
        <View style={[stylesModal.container, { backgroundColor: Colors[theme].text }]}>
          <Text style={[stylesModal.title, { color: Colors[theme].background }]}>Senha de Administrador</Text>
          <TextInput
            value={newPass}
            onChangeText={(text) => setNewPass(text.toUpperCase())}
            style={stylesModal.input}
            autoFocus
          />
          <Button title='Confirmar' onPress={handleConfirm} />

          {userAuth ? <Text style={stylesModal.errorMessage}>Senha inválida</Text> : <></>}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      <MenuItem title='Editar Katas' route='editarKatas' icon='karate' />
      <MenuItem title='Nova publicação' route='novoPost' icon='image-plus' />
    </SafeAreaView>
  );
};

export default ScreenMenu;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});

const stylesModal = StyleSheet.create({
  background: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    borderRadius: 16,
    maxWidth: '80%',
    padding: 16,
    paddingVertical: 32,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
  },
  input: {
    marginVertical: 16,
    padding: 8,
    width: '100%',
    borderWidth: 0.5,
  },

  errorMessage: {
    marginTop: 8,
    textAlign: 'center',
    color: 'red',
  },
});
