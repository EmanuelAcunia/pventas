// ClienteProvider.js
import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { getClientesPanel } from '../../services/ClientesServices';
import { useDatabase } from '../DatabaseContext';  // Importa el Provider y el hook
export const ClientesContext = createContext();

const ClientesProvider = ({ children }) => {
 const { db, addClient } = useDatabase();
  const [clientes, setClientes] = useState([]);
  
  const getClientesPanelData = async (appUser, appPass) => {
    try {
      const res = await getClientesPanel(appUser, appPass);
  
      if (res?.totalreg > 0 && Array.isArray(res.cliente)) {
        setClientes(res.cliente);
  
        // Insertar cada cliente en la base de datos
        for (const cliente of res.cliente) {
         await addClient(cliente.CLI_ID, cliente.CLI_NAME, cliente.CLI_DIRECCION, cliente.CLI_TYPE, cliente.CLI_MAXPORCDESCTO)
        }
  
        Alert.alert("Con datos", `Se encontraron ${res.cliente.length} clientes y se guardaron en SQLite.`);
      } else {
        setClientes([]);
        Alert.alert("Sin datos", "No se encontraron clientes.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener los clientes.");
      console.error("❌ Error en getClientesPanelData:", error);
    }
  };
  
  return (
    <ClientesContext.Provider value={{ clientes, getClientesPanelData }}>
      {children}
    </ClientesContext.Provider>
  );
};

export default ClientesProvider;
