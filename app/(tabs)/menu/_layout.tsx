import { Stack } from 'expo-router';
import React from 'react';

import Logo from '../../../components/Logo';

const ExameFaixaLayout = () => {
  return (
    <Stack screenOptions={{ headerRight: () => <Logo /> }}>
      <Stack.Screen name='index' options={{ title: 'Menu' }} />
    </Stack>
  );
};

export default ExameFaixaLayout;
