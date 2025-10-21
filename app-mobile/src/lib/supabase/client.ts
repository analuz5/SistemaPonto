import AsyncStorage from '@react-native-async-storage/async-storage'; // 1. Importa o armazenamento assíncrono
import 'react-native-url-polyfill/auto'; // 2. Garante compatibilidade de URLs
import { createClient } from '@supabase/supabase-js';

// 3. Lê as chaves de conexão do seu arquivo .env
// ATENÇÃO: Verifique se estas chaves estão no seu arquivo .env e começam com EXPO_PUBLIC_
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  // Isso é útil para debugging. Remove no código final se quiser.
  console.error("ERRO: As variáveis de ambiente do Supabase não foram carregadas corretamente. Verifique o arquivo .env.");
}

// 4. Cria e exporta o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Usa o AsyncStorage importado para salvar a sessão do usuário
    storage: AsyncStorage, 
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Necessário para React Native
  },
});