import React, { useState } from 'react';
// Importa todos os componentes necessários, incluindo Pressable para o hover
import { View, Text, TextInput, Pressable, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'; 
import { Feather, FontAwesome5 } from '@expo/vector-icons'; // Importando ícones
import styles from './LoginStyles'; // Estilos do arquivo LoginStyles.ts
import { useRouter } from 'expo-router'; // Ferramenta de navegação do Expo
import Toast from 'react-native-toast-message'; // Componente de alerta bonito (assumindo que foi instalado)

// Definição das rotas internas usando o grupo (app)
const ROTA_FUNCIONARIO = './tabs/employee';
const ROTA_GESTOR = './tabs/manager';
const ROTA_EMPRESA = './tabs/company';

// Componente principal da tela de Login
const LoginScreen = () => {
    // 1. Inicializa o roteador para navegação
    const router = useRouter(); 
    
    // 2. Estados para armazenar os dados de entrada
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    // 3. Estados para controlar o estado de foco do TextInput (solução para borda azul)
    const [usuarioFocado, setUsuarioFocado] = useState(false);
    const [senhaFocada, setSenhaFocada] = useState(false);


    // Lógica de Autenticação (Testes de Redirecionamento)
    // ESTA É A ÚNICA FUNÇÃO handleLogin
    const handleLogin = () => {
        // Normaliza as entradas para garantir que a comparação seja insensível a espaços
        const usuarioNormalizado = usuario.trim();
        const senhaNormalizada = senha.trim();
        
        // C. TESTE: Usuário Empresa (Maior prioridade para testar)
        if (usuarioNormalizado === 'Empresa' && senhaNormalizada === 'E123456') {
            router.replace(ROTA_EMPRESA); // Redirecionamento CORRETO
            console.log('Login Empresa OK!');
            return;
        }
        
        // B. TESTE: Usuário Gestor
        else if (usuarioNormalizado === 'Gestor' && senhaNormalizada === 'G123456') {
            router.replace(ROTA_GESTOR); // Redirecionamento CORRETO
            console.log('Login Gestor OK!');
            return;
        }

        // A. TESTE: Usuário Funcionário
        else if (usuarioNormalizado === 'Funcionario' && senhaNormalizada === 'F123456') {
            router.replace(ROTA_FUNCIONARIO); // Redirecionamento CORRETO
            console.log('Login Funcionário OK!');
            return;
        }

        // D. LOGIN INVÁLIDO (Usando Toast bonito)
        else {
            console.log('Login Inválido! Tente novamente.');
            alert ('Usuário ou Senha incorreto')
        }
    };

    // Lógica para Autenticação Biométrica (Você implementará depois)
    const handleBiometricAuth = () => {
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