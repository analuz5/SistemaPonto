import React, { useState } from 'react';
// Importa o Pressable e TouchableOpacity que são usados
import { View, Text, TextInput, Pressable, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'; 
import { Feather, FontAwesome5 } from '@expo/vector-icons'; // Importando ícones
import styles from './LoginStyles'; // Estilos do arquivo LoginStyles.ts

// Componente principal da tela de Login
const LoginScreen = () => {
    // Estados para armazenar os dados de entrada
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    // NOVOS ESTADOS: Para controlar o estado de foco do TextInput (solução para borda)
    const [usuarioFocado, setUsuarioFocado] = useState(false);
    const [senhaFocada, setSenhaFocada] = useState(false);


    const handleLogin = () => {
        // Lógica de autenticação com Supabase e redirecionamento (a ser implementada)
        console.log('Tentativa de Login:', usuario, senha);
    };

    const handleBiometricAuth = () => {
        // Lógica de autenticação biométrica (a ser implementada)
        console.log('Tentativa de Autenticação Biométrica');
    };

    return (
        // Garante que o conteúdo não fique sob o notch/barra de status
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
                                // Aplica estilo padrão e estilo de foco se 'usuarioFocado' for true
                                style={[styles.input, usuarioFocado && styles.inputFocado]} 
                                placeholder="Digite seu usuário"
                                value={usuario}
                                onChangeText={setUsuario}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                onFocus={() => setUsuarioFocado(true)} // Ativa o foco
                                onBlur={() => setUsuarioFocado(false)} // Desativa o foco
                            />
                        </View>
                        
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                // Aplica estilo padrão e estilo de foco se 'senhaFocada' for true
                                style={[styles.input, senhaFocada && styles.inputFocado]} 
                                placeholder="Digite sua senha"
                                value={senha}
                                onChangeText={setSenha}
                                secureTextEntry
                                onFocus={() => setSenhaFocada(true)} // Ativa o foco
                                onBlur={() => setSenhaFocada(false)} // Desativa o foco
                            />
                        </View>

                        {/* Botão Entrar com Efeito Hover/Pressed (usando Pressable) */}
                        <Pressable
                            onPress={handleLogin}
                            // Aplica o estilo de 'hover' quando 'pressed' for true
                            style={({ pressed }) => [
                                styles.btnLoginPrimary,
                                pressed && styles.btnLoginPrimaryPressed // Ativa o estilo de hover
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

                </View>
            </View>
        </SafeAreaView>
    );
};
export default LoginScreen;