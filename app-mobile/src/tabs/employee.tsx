import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location'; // Para a geolocalização
import employeeStyles from 'employeeStyles'; // Importa os estilos (próxima seção)
// import { supabase } from '../../lib/supabase/client'; // Importar Supabase após o teste

const EmployeeDashboard = () => {
    // 1. ESTADOS PARA DADOS DE ENTRADA/SAÍDA
    const [osInput, setOsInput] = useState('OS-2025-001'); // Estado para o INPUT da OS
    const [companyData, setCompanyData] = useState({ 
        name: 'Empresa Exemplo Ltda', // Simulação de dados buscados
        address: 'Rua do Cliente, 123 - Cidade', 
        status: 'Aguardando OS...'
    });
    const [isSearching, setIsSearching] = useState(false);
    
    // 2. ESTADOS PARA GEOLOCALIZAÇÃO
    const [location, setLocation] = useState({ 
        latitude: -23.244600, 
        longitude: -47.306100,
        status: 'Carregando...'
    }); 

    // 3. LÓGICA: Geoposição (Roda apenas uma vez)
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocation(prev => ({ ...prev, status: 'Permissão Negada!' }));
                return;
            }
            try {
                let result = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: result.coords.latitude,
                    longitude: result.coords.longitude,
                    status: 'Online' 
                });
            } catch (error) {
                setLocation(prev => ({ ...prev, status: 'GPS Desligado' }));
            }
        })();
    }, []); 

    // 4. LÓGICA: Busca da OS (Simula a busca no Supabase)
    const handleOsSearch = async (text: string) => {
        setOsInput(text); // Atualiza o input
        
        if (text.length < 5) {
            setCompanyData({ name: '', address: '', status: 'Digite a OS...' });
            return;
        }

        setIsSearching(true);
        
        // --- AQUI ENTRA O CÓDIGO REAL DE BUSCA NO SUPABASE ---
        // Ex: const { data, error } = await supabase.from('work_orders').select('*').eq('os_number', text).single();
        
        // Simulação de delay/busca (para fins de teste/TCC)
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        if (text === 'OS-2025-001') {
            setCompanyData({ 
                name: 'Tech Solutions Ltda', 
                address: 'Av. Paulista, 1000 - São Paulo',
                status: ''
            });
        } else {
             setCompanyData({ name: '', address: '', status: 'OS não encontrada.' });
        }
        setIsSearching(false);
    };

    // 5. LÓGICA: Ações Rápidas
    const handleAction = (action: string) => {
        console.log(`Ação Clicada: ${action}`);
        // Aqui você usaria router.push para navegar para o Registro de Viagem/Trabalho
    };


    return (
        <SafeAreaView style={employeeStyles.safeArea}>
            <ScrollView contentContainerStyle={employeeStyles.scrollContainer}>
                
                {/* CABEÇALHO */}
                <View style={employeeStyles.header}>
                    <Text style={employeeStyles.headerTitle}>Painel do Funcionário</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={employeeStyles.onlineStatus}>
                            <Feather name="circle" size={10} color="#28a745" /> {location.status}
                        </Text>
                        <TouchableOpacity style={employeeStyles.btnLogout} onPress={() => console.log('Sair')}>
                            <Text style={employeeStyles.btnLogoutText}>Sair</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* CARD DE INFORMAÇÕES E INPUT DE OS */}
                <View style={employeeStyles.card}>
                    <View style={employeeStyles.infoGroup}>
                        <Text style={employeeStyles.label}>Ordem de Serviço</Text>
                        <TextInput
                            style={employeeStyles.osInput}
                            placeholder="Digite a OS (Ex: OS-2025-001)"
                            value={osInput}
                            onChangeText={handleOsSearch} // Dispara a busca simulada
                            autoCapitalize="characters"
                        />
                        {isSearching && <ActivityIndicator style={{marginTop: 5}} color="#1e88e5" />}
                    </View>

                    <View style={employeeStyles.infoGroup}>
                        <Text style={[employeeStyles.label, {marginTop: 10}]}>Empresa</Text>
                        <Text style={employeeStyles.value}>{companyData.name || companyData.status}</Text>
                    </View>
                    
                    <View style={employeeStyles.infoGroup}>
                        <Text style={[employeeStyles.label, {marginTop: 10}]}>Local da OS</Text>
                        <Text style={employeeStyles.value}>{companyData.address || companyData.status}</Text>
                    </View>

                    {/* LOCALIZAÇÃO ATUAL */}
                    <View style={employeeStyles.locationCurrent}>
                        <Feather name="map-pin" size={18} color="#1e88e5" />
                        <View style={{marginLeft: 10}}>
                            <Text style={employeeStyles.label}>Localização Atual (GPS)</Text>
                            <Text style={employeeStyles.valueSmall}>
                                Lat: {location.latitude.toFixed(6)}, Long: {location.longitude.toFixed(6)}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* MAPA */}
                <Text style={employeeStyles.sectionTitle}>Mapa de Localização</Text>
                <View style={employeeStyles.mapCard}>
                    <Feather name="map" size={40} color="#1e88e5" />
                    <Text style={employeeStyles.mapText}>Mapa interativo será carregado aqui</Text>
                    <Text style={employeeStyles.mapCoords}>Lat: {location.latitude.toFixed(6)}, Long: {location.longitude.toFixed(6)}</Text>
                </View>


                {/* AÇÕES RÁPIDAS (Botões) */}
                <Text style={employeeStyles.sectionTitle}>Ações Rápidas</Text>
                <View style={employeeStyles.actionsGrid}>
                    
                    <TouchableOpacity style={employeeStyles.actionBtnPrimary} onPress={() => handleAction('Viagem')}>
                        <Feather name="send" size={24} color="#fff" />
                        <Text style={employeeStyles.actionBtnTextPrimary}>Viagem</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={employeeStyles.actionBtnSecondary} onPress={() => handleAction('Trabalho')}>
                        <Feather name="briefcase" size={24} color="#333" />
                        <Text style={employeeStyles.actionBtnTextSecondary}>Trabalho</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={employeeStyles.actionBtnSecondary} onPress={() => handleAction('Custos')}>
                        <Feather name="dollar-sign" size={24} color="#333" />
                        <Text style={employeeStyles.actionBtnTextSecondary}>Custos</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={employeeStyles.actionBtnSecondary} onPress={() => handleAction('Relatório')}>
                        <Feather name="file-text" size={24} color="#333" />
                        <Text style={employeeStyles.actionBtnTextSecondary}>Relatório</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default EmployeeDashboard;