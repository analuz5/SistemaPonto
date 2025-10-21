// LoginStyles.ts
import { StyleSheet } from 'react-native';

// Definindo a cor principal em uma variável para uso consistente
const PRIMARY_COLOR = 'rgb(40, 62, 156)'; 
const PRIMARY_DARK = 'rgb(28, 48, 118)'; // Cor um pouco mais escura para o hover

const styles = StyleSheet.create({
    // Estilo que garante que o conteúdo não invada a área segura (notch, barra de status)
    safeArea: {
        flex: 1,
        backgroundColor: '#f7f9fc', // Fundo cinza claro
    },
    // Container principal que centraliza o card na tela
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    // Estilo do Cartão de Login com Sombra (o "Brilho")
    loginCard: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 30,
        // Sombra para iOS
        shadowColor: PRIMARY_COLOR, 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        // Sombra para Android
        elevation: 8, 
    },
    
    // Estilo do Cabeçalho
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    // Ícone de Relógio (Feather)
    iconClock: {
        fontSize: 40,
        color: PRIMARY_COLOR,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    // Estilo do formulário (usa gap para espaçamento)
    loginForm: {
        width: '100%',
        gap: 15,
    },
    inputGroup: {
        marginBottom: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 5,
    },
    // Estilo padrão do campo de texto
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    // NOVO ESTILO: Estilo de Foco (Ativado via estado no index.tsx)
    inputFocado: {
        borderColor: PRIMARY_COLOR, // Borda azul suave
        borderWidth: 1, // Borda um pouco mais espessa para destacar
    },
    
    // ESTILO BASE DO BOTÃO PRINCIPAL (Entrar)
    btnLoginPrimary: {
        backgroundColor: PRIMARY_COLOR, 
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    // ESTILO DE HOVER/PRESSIONADO (ativado pelo Pressable)
    btnLoginPrimaryPressed: {
        backgroundColor: PRIMARY_DARK, // Usa a cor escura para o feedback
        opacity: 0.95,
    },

    btnTextPrimary: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPassword: {
        color: PRIMARY_COLOR,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
    },
    // Estilos do Divisor (linha "OU")
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd',
    },
    dividerText: {
        marginHorizontal: 10,
        color: PRIMARY_COLOR,
        fontSize: 14,
    },
    // Estilos do Botão de Biometria
    btnLoginBiometric: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
    },
    iconBiometric: {
        fontSize: 20,
        color: PRIMARY_COLOR,
        marginRight: 10,
    },
    btnTextBiometric: {
        color: PRIMARY_COLOR,
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export default styles;