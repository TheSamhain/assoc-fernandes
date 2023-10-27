import { Stack } from 'expo-router';
import React from 'react';

import Logo from '../../../components/Logo';

const ExameFaixaLayout = () => {
  return (
    <Stack screenOptions={{ headerRight: () => <Logo /> }} initialRouteName='index'>
      <Stack.Screen name='index' options={{ title: 'Menu' }} />
      <Stack.Screen name='editarKatas' options={{ title: 'Editar Katas' }} />
      <Stack.Screen name='novoPost' options={{ title: 'Nova publicação' }} />
      <Stack.Screen name='[...missing]' options={{ title: 'Não encontrado' }} />
    </Stack>
  );
};

export default ExameFaixaLayout;
