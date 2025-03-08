import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import PedidoForm from "./PedidoForm";

const PedidoFormScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Barra superior con botón de volver */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Pedido</Text>
      </View>

      {/* Contenido de la pantalla */}
      <View style={styles.content}>
        <PedidoForm
        navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

// Estilos mejorados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default PedidoFormScreen;
