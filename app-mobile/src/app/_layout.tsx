import { Stack, Redirect } from 'expo-router';
import React from 'react';

// ====================================================================
// 1. VARIÁVEL DE TESTE: Defina a rota que você quer testar AQUI.
// ====================================================================

// Usamos o nome da ROTA principal do grupo de abas, que é o nome da pasta 'tabs'.
// O Expo Router é inteligente o suficiente para saber que 'tabs' se refere ao '(tabs)/_layout.tsx'.
// Ao usar '/tabs', ele carrega a primeira aba definida (que é employee.tsx).
const ROTA_TESTE = '/tabs'; 


// Componente principal do layout de navegação
export default function RootLayout() {
  
  // Na vida real, esta lógica verificaria se o usuário está logado.
  // Como é para teste, fazemos o Redirect.
  
  return (
    // Stack de navegação (obrigatória no Expo Router)
    <Stack>
      
      {/* 2. Ação CRÍTICA: Redireciona para a tela de teste. */}
      {/* CORREÇÃO: Usamos o nome de rota mais simples '/tabs' */}
      <Redirect href={ROTA_TESTE} /> 
      
      
      {/* 3. Telas do App (Devem estar aqui para que o roteador as reconheça) */}
      
      {/* A tela de Login */}
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      
      {/* O grupo de abas (a rota '/tabs') */}
      <Stack.Screen 
        name="tabs" 
        options={{ headerShown: false }} 
      />

    </Stack>
  );
}