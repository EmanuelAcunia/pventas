import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import SyncGrid from "./SyncGrid"; // ✅ Importamos el componente de los botones
import ClientesProvider from '../../context/clientes/ClientesProvider'; // ✅ Importamos el proveedor de clientes
import ArticulosProvider from '../../context/articulos/ArticulosProvider'; // ✅ Importamos el proveedor de clientes
import OfertaCabProvider from '../../context/oferta-cabecera/OfertaCabProvider'; // ✅ Importamos el proveedor de clientes

const SyncScreen = ({ navigation }) => {
  return (
    <ClientesProvider>
      <ArticulosProvider>
        <OfertaCabProvider>
          <SafeAreaView style={styles.container}>
            {/* Barra superior con botón de volver */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.backButton}>
                <Text style={styles.backText}>← Volver</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Sincronizar</Text>
            </View>

            {/* Grid con botones de sincronización */}
            <SyncGrid />
          </SafeAreaView>
        </OfertaCabProvider>
      </ArticulosProvider>
    </ClientesProvider>
  );
};


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

export default SyncScreen;
