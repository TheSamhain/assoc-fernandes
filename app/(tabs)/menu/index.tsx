import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { SafeAreaView, Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';

const ScreenMenu = () => {
  const router = useRouter();
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
      <TouchableOpacity style={styles.item} onPress={() => router.push({ pathname: 'menu/editarKatas' })}>
        <MaterialCommunityIcons size={28} name='karate' color={Colors[theme].text} />
        <Text style={styles.itemText}>Editar Katas</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ScreenMenu;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  item: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    marginLeft: 8,
    fontSize: 16,
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
