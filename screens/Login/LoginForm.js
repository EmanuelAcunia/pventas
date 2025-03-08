import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { LoginContext } from "../../context/login/LoginProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginForm = ({ navigation }) => {
  const { postLoginData } = useContext(LoginContext);
  const [formData, setFormData] = useState({ appuser: "", apppass: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.appuser.trim()) {
      newErrors.appuser = "Ingrese su usuario";
    }

    if (!formData.apppass.trim()) {
      newErrors.apppass = "Ingrese su contraseña";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm() || loading) return;
    setLoading(true); // 🔹 Iniciar carga

    const { appuser, apppass } = formData;

    if (appuser === "admin" && apppass === "4Dm1n") {
      await AsyncStorage.setItem("userType", "admin");
      Alert.alert("Inicio de sesión local", "Bienvenido, administrador");
      navigation.navigate("Home");
      setLoading(false); // 🔹 Detener carga
      return;
    }

    try {
      const response = await postLoginData(formData);
      console.log("Respuesta de postLoginData:", response);
      if (response) {
        await AsyncStorage.setItem("userType", "apiUser");
        Alert.alert("Inicio de sesión exitoso", `Bienvenido, ${appuser}`);
        navigation.navigate("Home");
      } else {
        setErrors({ apppass: "Usuario o contraseña incorrectos" });
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor");
    } finally {
      setLoading(false); // 🔹 Asegurar que el loading se detenga
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={[styles.input, errors.appuser && styles.inputError]}
        placeholder="Usuario"
        value={formData.appuser}
        onChangeText={(text) => setFormData({ ...formData, appuser: text })}
      />
      {errors.appuser && <Text style={styles.errorText}>{errors.appuser}</Text>}

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput, errors.apppass && styles.inputError]}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          value={formData.apppass}
          onChangeText={(text) => setFormData({ ...formData, apppass: text })}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showPasswordButton}>
          <Text style={styles.showPasswordText}>{showPassword ? "Ocultar" : "Mostrar"}</Text>
        </TouchableOpacity>
      </View>
      {errors.apppass && <Text style={styles.errorText}>{errors.apppass}</Text>}

      <TouchableOpacity 
        style={[styles.loginButton, loading && styles.disabledButton]} 
        onPress={handleLogin} 
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Ingresar</Text>}
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  passwordInput: {
    flex: 1,
  },
  showPasswordButton: {
    padding: 10,
  },
  showPasswordText: {
    color: "#6439ff",
    fontWeight: "bold",
  },
  loginButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#6439ff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginForm;
