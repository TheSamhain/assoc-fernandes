import { Stack } from 'expo-router';
import React from 'react';

import Logo from '../../../components/Logo';

const ExameFaixaLayout = () => {
  return (
    <Stack screenOptions={{ headerRight: () => <Logo /> }}>
      <Stack.Screen name='index' options={{ title: 'Menu' }} />
      <Stack.Screen name='editarKatas' options={{ title: 'Editar Katas' }} />
    </Stack>
  );
};

export default ExameFaixaLayout;
