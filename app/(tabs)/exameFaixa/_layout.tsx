import { Stack } from 'expo-router';
import React from 'react';

import Logo from '../../../components/Logo';

const ExameFaixaLayout = () => {
  return (
    <Stack screenOptions={{ headerRight: () => <Logo /> }}>
      <Stack.Screen name='index' options={{ title: 'Exame de faixa' }} />

      <Stack.Screen
        name='[kyu]'
        options={{
          title: 'Exame de faixa - Detalhes',
          headerShown: true,
          headerShadowVisible: false,
          headerRight: undefined,
        }}
      />
    </Stack>
  );
};

export default ExameFaixaLayout;
