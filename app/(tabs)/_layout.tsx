import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import Logo from '../../components/Logo';
import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string }) {
  return <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerRight: () => <Logo />,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
      />

      <Tabs.Screen
        name='katas'
        options={{
          title: 'Katas',
          tabBarIcon: ({ color }) => <TabBarIcon name='karate' color={color} />,
        }}
      />

      {/* <Tabs.Screen
        name='exameFaixa'
        options={{
          title: 'Exame faixa',
          tabBarIcon: ({ color }) => <TabBarIcon name='chevron-triple-up' color={color} />,
          headerShown: false,
        }}
      /> */}

      <Tabs.Screen
        name='menu'
        options={{
          title: 'Acesso restrito',
          tabBarIcon: ({ color }) => <TabBarIcon name='shield-lock' color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
