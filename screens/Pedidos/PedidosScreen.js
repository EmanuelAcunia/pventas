import React, { useState, useEffect } from 'react';
import { SafeAreaView, View,Text, TouchableOpacity, StyleSheet } from 'react-native'
import PedidosGrid from "./PediidosTable/PedidosGrid";
const PedidosScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        {/* Barra superior con botón de volver */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.backButton}>
            <Text style={styles.backText}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Lista de Pedidos</Text>
        </View>

        {/* Grid con botones de sincronización */}
        <PedidosGrid 
        navigation={navigation}
        />
      </SafeAreaView>

    </View>
  );
};

// Estilos

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 8,
    backgroundColor: "#333",
    borderRadius: 5,
  },
  backText: {
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
  },
});

export default PedidosScreen;
