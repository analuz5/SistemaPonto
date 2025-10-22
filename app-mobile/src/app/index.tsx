import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'; 
import { Feather, FontAwesome5 } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router'; 
import Toast from 'react-native-toast-message'; 
import styles from './LoginStyles'; // Estilos do arquivo LoginStyles.ts

// Definição das rotas internas (DEVE SER ABSOLUTA PARA O ROUTER)
const ROTA_FUNCIONARIO = '/(tabs)/employee';
const ROTA_GESTOR = '/(tabs)/manager';
const ROTA_EMPRESA = '/(tabs)/company';

// Componente principal da tela de Login
const LoginScreen = () => {
    // 1. Inicializa o roteador
    const router = useRouter(); 
    
    // 2. Estados para entrada e foco
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [usuarioFocado, setUsuarioFocado] = useState(false);
    const [senhaFocada, setSenhaFocada] = useState(false);


    // Lógica de Autenticação (Testes de Redirecionamento)
    const handleLogin = () => {
        const usuarioNormalizado = usuario.trim();
        const senhaNormalizada = senha.trim();
        
        // C. TESTE: Usuário Empresa
        if (usuarioNormalizado === 'Empresa' && senhaNormalizada === 'E123456') {
            router.replace(ROTA_EMPRESA); 
            Toast.show({ type: 'success', text1: 'Login OK!', text2: 'Acesso como Empresa.' });
            return;
        }
        
        // B. TESTE: Usuário Gestor
        else if (usuarioNormalizado === 'Gestor' && senhaNormalizada === 'G123456') {
            router.replace(ROTA_GESTOR); 
            Toast.show({ type: 'success', text1: 'Login OK!', text2: 'Acesso como Gestor.' });
            return;
        }

        // A. TESTE: Usuário Funcionário
        else if (usuarioNormalizado === 'Funcionario' && senhaNormalizada === 'F123456') {
            router.replace(ROTA_FUNCIONARIO); 
            Toast.show({ type: 'success', text1: 'Login OK!', text2: 'Acesso como Funcionário.' });
            return;
        }

        // D. LOGIN INVÁLIDO (Feedback Bonito)
        else {
            Toast.show({
                type: 'error',
                text1: 'Acesso Negado',
                text2: 'Credenciais de teste incorretas.',
                position: 'top',
                visibilityTime: 3000,
            });
        }
    };

    const handleBiometricAuth = () => {
        Toast.show({ type: 'info', text1: 'Biometria', text2: 'Funcionalidade em desenvolvimento.' });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.loginContainer}>
                <View style={styles.loginCard}>
                    
                    {/* Cabeçalho */}
                    <View style={styles.header}>
                        <Feather name="clock" style={styles.iconClock} />
                        <Text style={styles.title}>Sistema de Ponto</Text>
                        <Text style={styles.subtitle}>Registre sua jornada de trabalho com segurança</Text>
                    </View>

                    {/* Formulário de Login */}
                    <View style={styles.loginForm}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Usuário</Text>
                            <TextInput
                                style={[styles.input, usuarioFocado && styles.inputFocado]} 
                                placeholder="Digite seu usuário"
                                value={usuario}
                                onChangeText={setUsuario}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                onFocus={() => setUsuarioFocado(true)} 
                                onBlur={() => setUsuarioFocado(false)} 
                            />
                        </View>
                        
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                style={[styles.input, senhaFocada && styles.inputFocado]} 
                                placeholder="Digite sua senha"
                                value={senha}
                                onChangeText={setSenha}
                                secureTextEntry
                                onFocus={() => setSenhaFocada(true)} 
                                onBlur={() => setSenhaFocada(false)} 
                            />
                        </View>

                        {/* Botão Entrar com Efeito Hover/Pressed */}
                        <Pressable
                            onPress={handleLogin}
                            style={({ pressed }) => [
                                styles.btnLoginPrimary,
                                pressed && styles.btnLoginPrimaryPressed
                            ]}
                        >
                            <Text style={styles.btnTextPrimary}>Entrar</Text>
                        </Pressable>

                        {/* Link Esqueci a Senha */}
                        <TouchableOpacity> 
                            <Text style={styles.forgotPassword}>Esqueci a senha</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Divisor OU */}
                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OU</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Botão de Biometria */}
                    <TouchableOpacity style={styles.btnLoginBiometric} onPress={handleBiometricAuth}>
                        <FontAwesome5 name="fingerprint" style={styles.iconBiometric} />
                        <Text style={styles.btnTextBiometric}>Autenticação Biométrica</Text>
                    </TouchableOpacity>

                    {/* === MENU DE TESTE RÁPIDO (DEV) === */}
                    <View style={styles.quickTestContainer}>
                        <Text style={styles.quickTestTitle}>Acesso Rápido (DEV)</Text>
                        
                        <View style={styles.quickTestGrid}>
                            
                            <TouchableOpacity style={styles.quickTestButton} onPress={() => router.replace(ROTA_FUNCIONARIO)}>
                                <Text style={styles.quickTestText}>Funcionario</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.quickTestButton} onPress={() => router.replace(ROTA_GESTOR)}>
                                <Text style={styles.quickTestText}>Gestor</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={styles.quickTestButton} onPress={() => router.replace(ROTA_EMPRESA)}>
                                <Text style={styles.quickTestText}>Empresa</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                    {/* === FIM BLOCO DE TESTE RÁPIDO === */}

                </View>
            </View>
        </SafeAreaView>
    );
};
export default LoginScreen;