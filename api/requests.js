import api from "./api"; // Importa la configuración de Axios
import { Alert } from "react-native";

// GET (Obtener datos)
export const getData = async (url) => {
  console.log("🔹 GET Request URL:", url);
  try {
    const response = await api.get(url, { responseType: "text" }); // Forzar texto
    let rawData = response.data;

    // Si la respuesta tiene una función de callback, limpiamos
    if (rawData.startsWith("(") && rawData.endsWith(");")) {
      rawData = rawData.slice(1, -2); // Eliminar "(" al inicio y ");" al final
    }
    const jsonData = JSON.parse(rawData); 

    return jsonData;
  } catch (error) {
    console.error("❌ Error en GET:", error);
    throw error;
  }
};


// POST (Crear datos)
export const postData = async (url, body) => {
  console.log("🔹 POST Request URL:",api,"", url, "📦 Body:", body);
  try {
    const response = await api.post(url, body);
    Alert.alert("✅ Éxito", "El registro fue creado correctamente");
    return response.data;
  } catch (error) {
    console.error("❌ Error en POST:", error);
    Alert.alert("Error", error.response?.data?.message || "No se pudo completar la acción");
    throw error;
  }
};

// PUT (Actualizar datos)
export const putData = async (url, body) => {
  console.log("🔹 PUT Request URL:", url, "📦 Body:", body);
  try {
    const response = await api.put(url, body);
    Alert.alert("✅ Éxito", "El registro fue actualizado correctamente");
    return response.data;
  } catch (error) {
    console.error("❌ Error en PUT:", error);
    Alert.alert("Error", error.response?.data?.message || "No se pudo actualizar la información");
    throw error;
  }
};

// DELETE (Eliminar datos)
export const deleteData = async (url) => {
  console.log("🔹 DELETE Request URL:", url);
  try {
    await api.delete(url);
    Alert.alert("✅ Éxito", "El registro fue eliminado correctamente");
  } catch (error) {
    console.error("❌ Error en DELETE:", error);
    Alert.alert("Error", "No se pudo eliminar el registro");
    throw error;
  }
};
