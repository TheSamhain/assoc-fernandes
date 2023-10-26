import React, { useState } from 'react';
import { Button, StyleSheet, useColorScheme } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import MenuItem from '../../../components/menu/MenuItem';
import { SafeAreaView, Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';

const ScreenMenu = () => {
  const theme = useColorScheme() ?? 'light';

  const [userAuth, setUserAuth] = useState('');
  const [newPass, setNewPass] = useState('');

  if (userAuth.toUpperCase() !== 'AFK#123') {
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
          <Button title='Confirmar' onPress={() => setUserAuth(newPass)} />

          {userAuth ? <Text style={stylesModal.errorMessage}>Senha inválida</Text> : <></>}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      <MenuItem title='Editar Katas' route='editKatas' icon='karate' />
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
