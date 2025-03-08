import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import { getOfertasPanel } from '../../services/OfertasCabServices';

export const OfertasCabContext = createContext();

const OfertasCabProvider = ({ children }) => {
  const [ofertasCab, setOfertasCab] = useState([]);

  const getOfertasCabPanelData = async (appUser, appPass) => {
    try {
      let res = await getOfertasPanel(appUser, appPass);
      console.log("📥 Datos recibidos en getOfertasCabPanelData:", res);
      console.log("📥 Datos recibidos en getOfertasCabPanelData:", res.oferta);
      console.log("📥 Tipo Datos recibidos en getOfertasCabPanelData:", typeof res.oferta);

      // Verificar si `res.oferta` es un array, si no, asignar un array vacío
      const ofertasArray = Array.isArray(res?.oferta) ? res.oferta : [];

      console.log("📥 ofertas array en getOfertasCabPanelData:", ofertasArray);
      if (res?.totalreg > 0 && ofertasArray.length > 0) {
        setOfertasCab(ofertasArray);
        Alert.alert("Con datos", `Se encontraron ${ofertasArray.length} ofertas.`);
      } else {
        setOfertasCab([]); // Asegurar que el estado se limpia si no hay datos
        Alert.alert("Sin datos", "No se encontraron Ofertas.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener las ofertas.");
      console.error("❌ Error en getOfertasCabPanelData:", error);
    }
  };

  return (
    <OfertasCabContext.Provider value={{ ofertasCab, getOfertasCabPanelData }}>
      {children}
    </OfertasCabContext.Provider>
  );
};

export default OfertasCabProvider;
