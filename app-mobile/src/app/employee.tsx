// (app)/employee.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import * as Location from 'expo-location'; // <--- IMPORTAÇÃO NECESSÁRIA PARA GEOLOCALIZAÇÃO

// O componente principal do Dashboard do Funcionário
const EmployeeDashboard = () => {
    // Dados de simulação (Serão substituídos por dados do Supabase)
    const [osNumber, setOsNumber] = useState('OS-2025-001'); 
    const [companyName, setCompanyName] = useState('Empresa Exemplo Ltda');
    
    // Estado para armazenar os dados de Localização (Geolocalização)
    const [location, setLocation] = useState({ 
        latitude: -23.244600, 
        longitude: -47.306100,
        status: 'Carregando...' // Status inicial enquanto busca o GPS
    });

    // Lógica para obter a localização real do dispositivo
    useEffect(() => {
        (async () => {
            // 1. Solicita permissão de localização
            let { status } = await Location.requestForegroundPermissionsAsync();
            
            if (status !== 'granted') {
                // Permissão negada pelo usuário
                setLocation(prev => ({ ...prev, status: 'Permissão Negada!' }));
                return;
            }
            
            try {
                // 2. Obtém a posição atual (Requisito do TCC: Capturar localização)
                let locationResult = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High, // Alta precisão é importante para o ponto
                });
                
                // 3. Atualiza o estado com a localização real
                setLocation({
                    latitude: locationResult.coords.latitude,
                    longitude: locationResult.coords.longitude,
                    status: 'Online' 
                });
            } catch (error) {
                // Erro ao obter a localização
                setLocation(prev => ({ ...prev, status: 'GPS Desligado ou Erro' }));
                console.error("Erro ao obter a localização:", error);
            }

        })(); // Função anônima auto-executável
    }, []); // O array vazio [] garante que a função rode apenas uma vez (na montagem)

    // Lógica de manipulação de ações (Viagem, Trabalho, etc.)
    const handleAction = (action: string) => {
        console.log(`Ação Rápida Clicada: ${action}`);
        // AQUI: Implementar a navegação para as telas de Registro (Viagem, Trabalho, etc.)
    };

    return (
        <SafeAreaView style={employeeStyles.safeArea}>
            <ScrollView contentContainerStyle={employeeStyles.scrollContainer}>
                
                {/* CABEÇALHO PERSONALIZADO */}
                <View style={employeeStyles.header}>
                    <Text style={employeeStyles.headerTitle}>Painel do Funcionário</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={employeeStyles.onlineStatus}>
                            <Feather name="circle" size={10} color="#28a745" /> {location.status}
                        </Text>
                        <TouchableOpacity style={employeeStyles.btnLogout}>
                            <Text style={employeeStyles.btnLogoutText}>Sair</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* CARD DE INFORMAÇÕES (OS e EMPRESA) */}
                <View style={employeeStyles.card}>
                    <Text style={employeeStyles.label}>Ordem de Serviço</Text>
                    <Text style={employeeStyles.valuePrimary}>{osNumber}</Text>
                    
                    <Text style={[employeeStyles.label, {marginTop: 10}]}>Empresa</Text>
                    <Text style={employeeStyles.value}>{companyName}</Text>

                    {/* LOCALIZAÇÃO ATUAL */}
                    <View style={employeeStyles.locationCurrent}>
                        <Feather name="map-pin" size={18} color="#1e88e5" />
                        <View style={{marginLeft: 10}}>
                            <Text style={employeeStyles.label}>Localização Atual</Text>
                            <Text style={employeeStyles.valueSmall}>
                                Lat: {location.latitude.toFixed(6)}, Long: {location.longitude.toFixed(6)}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* MAPA DE LOCALIZAÇÃO (PROVA DE CONCEITO DE GEOLOCALIZAÇÃO) */}
                <Text style={employeeStyles.sectionTitle}>Mapa de Localização</Text>
                <View style={employeeStyles.mapCard}>
                    <Feather name="map" size={40} color="#1e88e5" />
                    <Text style={employeeStyles.mapText}>Mapa interativo será carregado aqui</Text>
                    <Text style={employeeStyles.mapCoords}>Lat: {location.latitude.toFixed(6)}, Long: {location.longitude.toFixed(6)}</Text>
                </View>


                {/* AÇÕES RÁPIDAS (4 BOTÕES) */}
                <Text style={employeeStyles.sectionTitle}>Ações Rápidas</Text>
                <View style={employeeStyles.actionsGrid}>
                    
                    {/* BOTÃO 1: VIAGEM (Deslocamento) */}
                    <TouchableOpacity 
                        style={employeeStyles.actionBtnPrimary} 
                        onPress={() => handleAction('Viagem')}
                    >
                        <Feather name="send" size={24} color="#fff" />
                        <Text style={employeeStyles.actionBtnTextPrimary}>Viagem</Text>
                    </TouchableOpacity>
                    
                    {/* BOTÃO 2: TRABALHO (Registro de Jornada) */}
                    <TouchableOpacity 
                        style={employeeStyles.actionBtnSecondary} 
                        onPress={() => handleAction('Trabalho')}
                    >
                        <Feather name="briefcase" size={24} color="#333" />
                        <Text style={employeeStyles.actionBtnTextSecondary}>Trabalho</Text>
                    </TouchableOpacity>
                    
                    {/* BOTÃO 3: CUSTOS */}
                    <TouchableOpacity 
                        style={employeeStyles.actionBtnSecondary} 
                        onPress={() => handleAction('Custos')}
                    >
                        <Feather name="dollar-sign" size={24} color="#333" />
                        <Text style={employeeStyles.actionBtnTextSecondary}>Custos</Text>
                    </TouchableOpacity>
                    
                    {/* BOTÃO 4: RELATÓRIO */}
                    <TouchableOpacity 
                        style={employeeStyles.actionBtnSecondary} 
                        onPress={() => handleAction('Relatório')}
                    >
                        <Feather name="file-text" size={24} color="#333" />
                        <Text style={employeeStyles.actionBtnTextSecondary}>Relatório</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

// --- Estilos Específicos do Dashboard do Funcionário ---
const employeeStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f7f9fc',
    },
    scrollContainer: {
        padding: 20,
    },
    
    // Cabeçalho
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    onlineStatus: {
        fontSize: 12,
        color: '#28a745',
        marginRight: 10,
    },
    btnLogout: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    btnLogoutText: {
        fontSize: 12,
        color: '#666',
    },

    // Cards
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    label: {
        fontSize: 12,
        color: '#666',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 15,
        color: '#333',
        marginBottom: 5,
    },
    valuePrimary: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#347eff',
    },

    // Localização
    locationCurrent: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        marginTop: 15,
        paddingTop: 10,
    },
    valueSmall: {
        fontSize: 12,
        color: '#666',
    },

    // Mapa
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        marginTop: 10,
    },
    mapCard: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6f0ff',
        marginBottom: 20,
    },
    mapText: {
        color: '#347eff',
        fontSize: 14,
        marginTop: 5,
    },
    mapCoords: {
        color: '#347eff',
        fontSize: 12,
        marginTop: 2,
    },

    // Ações Rápidas
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 15, // Espaçamento entre os botões
        marginBottom: 20,
    },
    actionBtnPrimary: {
        flex: 1,
        minWidth: '45%', // Garante dois botões por linha
        backgroundColor: '#347eff',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    actionBtnSecondary: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: '#e9eef6',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    actionBtnTextPrimary: {
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 5,
    },
    actionBtnTextSecondary: {
        color: '#333',
        fontWeight: 'bold',
        marginTop: 5,
    },
});

export default EmployeeDashboard;