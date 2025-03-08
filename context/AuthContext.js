import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode"; // Ya no necesita llaves {}
import { useNavigation } from "@react-navigation/native"; 

// Crear el contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation(); // Reemplazo de useNavigate()
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        try {
          jwtDecode(storedToken); // Validar el token
          setToken(storedToken);
          setIsAuthenticated(true);
          await loadEmpresa();
        } catch (error) {
          console.error("Token inválido, cerrando sesión...");
          logout();
        }
      }
    };

    checkToken();
  }, []);


  const login = async (newToken) => {
    try {
      jwtDecode(newToken); // Validar token antes de guardarlo
      await AsyncStorage.setItem("token", newToken);
      setToken(newToken);
      setIsAuthenticated(true);
      await loadEmpresa();
      navigation.navigate("Home"); // Navegar a Home tras el login
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      logout();
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    navigation.navigate("Login"); // Redirigir a Login
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout, isLoadEmpresa, empresaData }}>
      {children}
    </AuthContext.Provider>
  );
};
