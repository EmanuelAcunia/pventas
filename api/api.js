import axios from "axios";
import { API_URL } from "@env"; // Asegúrate de que está bien definido

// Verificar si API_URL está definido
if (!API_URL) {
  console.error("❌ ERROR: API_URL no está definido en .env");
}
console.log("api rrrrr",API_URL);
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de respuestas para manejar errores
api.interceptors.response.use(
  (response) => response, // Retorna la respuesta si es exitosa
  (error) => {
    console.error("❌ Error en la respuesta de la API:", error);
    return Promise.reject(error);
  }
);

export default api;
