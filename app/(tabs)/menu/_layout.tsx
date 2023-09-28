import { Stack } from 'expo-router';
import React from 'react';

import Logo from '../../../components/Logo';

const ExameFaixaLayout = () => {
  return (
    <Stack screenOptions={{ headerRight: () => <Logo /> }}>
      <Stack.Screen name='index' options={{ title: 'Menu' }} />
      <Stack.Screen name='editarKatas/index' options={{ title: 'Editar Katas' }} />
      <Stack.Screen name='editarKatas/[kyu]' options={{ headerRight: undefined }} />
    </Stack>
  );
};

export default ExameFaixaLayout;
