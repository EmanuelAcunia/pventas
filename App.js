// App.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { DatabaseProvider, useDatabase } from './context/DatabaseContext';  // Importa el Provider y el hook
import AppNavigator from "./navigation/AppNavigator";

const App = () => {
  return (
    <DatabaseProvider>
      <AppNavigator />
    </DatabaseProvider>
  );
};

// Componente principal que usa la base de datos
const Main = () => {
  const { db, admin } = useDatabase();  // Usamos el hook para obtener la base de datos y el admin
  const adminData = admin && admin.length > 0 ? admin[0] : null;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información del Administrador</Text>
      {admin ? (
        <View>
          <Text >Nombre: {adminData.USR_NOM}</Text>
          <Text >Email: {adminData.USR_PASS}</Text>
        </View>
      ) : (
        <Text>No se encontró información del administrador.</Text>
      )}
    </View>
  );
};

// Estilos para la vista
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default App;
