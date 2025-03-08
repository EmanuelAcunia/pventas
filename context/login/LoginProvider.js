import React, { useState, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { postAuthLogin } from "../../services/UserServices"; 

export const LoginContext = createContext(); // ✅ Definir el contexto

const LoginProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});

  const postLoginData = async (body) => {
    console.log("Datos enviados:", body);
    setError(null);
    let appUser = body.appuser;
    let appPass = body.apppass;
    try {
      const res = await postAuthLogin(appUser, appPass);
      console.log("Datos recibidos:", res);

      if (res) {
        const seller = res;

        if (!seller ) {
          throw new Error("Datos del usuario no válidos.");
        }

        await AsyncStorage.setItem("userData", JSON.stringify(seller));

        setUserData(seller);
        return res;
      } else {
        setError("Error en la autenticación.");
        return null;
      }
    } catch (error) {
      console.error("Error en postLoginData:", error);
      setError(error.message);
      Alert.alert("Error", "No se pudo iniciar sesión. Verifica tus credenciales.");
      return null;
    }
  };

  return (
    <LoginContext.Provider value={{ postLoginData, userData, error }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
