// ClienteProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getArticulosPanel } from '../../services/ArticulosServices';

export const ArticulosContext = createContext();

const ArticulosProvider = ({ children }) => {
  const [articulos, setArticulos] = useState([]);

  const getArticulosPanelData = async (appUser, appPass) => {
    try {
      let res = await getArticulosPanel(appUser, appPass);
      console.log("📥 Datos recibidos en getArticulosPanelData:", res);
      
      console.log("📥 Tipo Datos recibidos en getOfertasCabPanelData:", typeof res.producto);
      // Verificar si `res.cliente` es un array
      const articulosArray = Array.isArray(res?.producto) ? res.producto : [];

      if (res && res.totalreg > 0) {
        setArticulos(res.producto);
        Alert.alert("Con datos", `Se encontraron ${articulosArray.length} articulos.`)
      } else {
        Alert.alert("Sin datos", "No se encontraron Articulos.");
        return [];
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener los Articulos.");
      console.error("❌ Error en getArticulosPanelData:", error);
      return [];
    }
  };

  return (
    <ArticulosContext.Provider value={{ articulos, getArticulosPanelData }}>
      {children}
    </ArticulosContext.Provider>
  );
};

export default ArticulosProvider;