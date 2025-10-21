// (app)/_layout.tsx
import { Tabs } from 'expo-router';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';

// Este layout se aplica a todas as rotas dentro da pasta (app)
export default function AppLayout() {
  return (
    <Tabs>
      {/* Rota 1: Dashboard do Funcionário */}
      <Tabs.Screen
        name="employee"
        options={{
          title: 'Meu Ponto',
          headerShown: false, // Oculta o cabeçalho padrão para usar um customizado
          tabBarIcon: ({ color }) => <Feather name="clock" size={24} color={color} />,
        }}
      />

      {/* Rota 2: Dashboard do Gestor */}
      <Tabs.Screen
        name="manager"
        options={{
          title: 'Gestão',
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather name="user-check" size={24} color={color} />,
        }}
      />

      {/* Rota 3: Dashboard da Empresa */}
      <Tabs.Screen
        name="company"
        options={{
          title: 'Empresa',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome5 name="building" size={20} color={color} />,
        }}
      />
    </Tabs>
  );
}