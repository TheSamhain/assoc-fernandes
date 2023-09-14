import { Stack } from 'expo-router';
import React from 'react';

const ExameFaixaLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' />

      <Stack.Screen
        name='detalhes'
        options={{
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default ExameFaixaLayout;
