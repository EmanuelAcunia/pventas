import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import ProductoForm from "./ProductoForm";

const ProductoScreen = ({ navigation, route }) => {
  console.log(route.params); // Verifica si 'articulo' llega bien

  const { articulo } = route.params;
  if (!articulo) {
      return (
          <View style={styles.container}>
              <Text style={styles.errorText}>Error: No se ha seleccionado un artículo</Text>
          </View>
      );
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* Barra superior con botón de volver */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Articulo</Text>
      </View>

      {/* Contenido de la pantalla */}
      <View style={styles.content}>
        {/* Pasar `navigation` y `route` a PedidoDetalleForm */}
        
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#007bff',
  },
  backButton: {
    marginRight: 10,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default ProductoScreen;
