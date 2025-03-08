// ClienteProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getOfertasDetPanel } from '../../services/OfertasDetServices';

export const OfertasDetContext = createContext();

const OfertasDetProvider = ({ children }) => {
  const [ofertasDet, setOfertasDet] = useState([]);

  const getOfertasDetPanelData = async (appUser, appPass) => {
    try {
      let res = await getOfertasDetPanel(appUser, appPass);
      console.log("📥 Datos recibidos en getOfertasDetPanelData:", res);

      if (res && res.length > 0) {
        Alert.alert("Sin datos", "Se encontraron OfertasDet.");
      } else {
        Alert.alert("Sin datos", "No se encontraron OfertasDet.");
        return [];
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener los OfertasDet.");
      console.error("❌ Error en getOfertasDetPanelData:", error);
      return [];
    }
  };

  return (
    <OfertasDetContext.Provider value={{ ofertasDet, getOfertasDetPanelData }}>
      {children}
    </OfertasDetContext.Provider>
  );
};

export default OfertasDetProvider;