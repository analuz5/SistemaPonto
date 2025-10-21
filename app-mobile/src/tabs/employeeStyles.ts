// EmployeeStyles.ts
import { StyleSheet } from 'react-native';

const employeeStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f9fc', // Fundo cinza claro
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
  // Estilo do Input de OS (para que o funcionário possa digitar)
  osInput: {
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      fontSize: 16,
      marginBottom: 5,
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
    gap: 15,
    marginBottom: 20,
  },
  actionBtnPrimary: {
    flex: 1,
    minWidth: '45%',
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

export default employeeStyles;