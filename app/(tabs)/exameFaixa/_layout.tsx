import { Stack } from 'expo-router';
import React from 'react';

const ExameFaixaLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' options={{ title: 'Exame de faixa' }} />

      <Stack.Screen
        name='detalhes'
        options={{
          title: 'Exame de faixa - Detalhes',
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default ExameFaixaLayout;
