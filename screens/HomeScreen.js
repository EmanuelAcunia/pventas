import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const getUserType = async () => {
      const storedUserType = await AsyncStorage.getItem("userType");
      setUserType(storedUserType);
    };
    getUserType();
  }, []);

  // Función para cerrar la app
  const handleExitApp = () => {
    BackHandler.exitApp(); // Cierra la aplicación
  };

  return (
    <View style={styles.container}>
      {userType === "admin" && (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>Panel de Control</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Usuarios")}>
            <Text style={styles.buttonText}>Usuarios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Ajustes")}>
            <Text style={styles.buttonText}>Ajustes</Text>
          </TouchableOpacity>
        </>
      )}
      {userType !== "admin" && (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>Empresa</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Sincronizacion")}>
            <Text style={styles.buttonText}>Sincronizar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Pedidos")}>
            <Text style={styles.buttonText}>Pedidos</Text>
          </TouchableOpacity>
        </>
      )}
      {/* Botón para salir de la app */}
      <TouchableOpacity style={styles.button} onPress={handleExitApp}>
        <Text style={styles.buttonText}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    paddingVertical: 20,
  },
  header: {
    backgroundColor: "#000",
    width: "100%",
    paddingVertical: 15,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    width: "90%",
    backgroundColor: "#fff",
    paddingVertical: 12,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default HomeScreen;
