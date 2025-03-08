import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { ProgressBar } from "react-native-paper";
import { ClientesContext } from "../../context/clientes/ClientesProvider";
import { ArticulosContext } from "../../context/articulos/ArticulosProvider";
import { OfertasCabContext } from "../../context/oferta-cabecera/OfertaCabProvider";

const SyncGrid = () => {
  const { getClientesPanelData, clientes } = useContext(ClientesContext);
  const { getArticulosPanelData, articulos } = useContext(ArticulosContext);
  const { getOfertasCabPanelData, ofertasCab } = useContext(OfertasCabContext);

  // Estados de carga y progreso
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [progressClientes, setProgressClientes] = useState(0);
  const [loadingArticulos, setLoadingArticulos] = useState(false);
  const [progressArticulos, setProgressArticulos] = useState(0);
  const [loadingOfertas, setLoadingOfertas] = useState(false);
  const [progressOfertas, setProgressOfertas] = useState(0);

  // Función para iniciar la carga simulada
  const startLoading = (setLoading, setProgress, callback) => {
    setLoading(true);
    setProgress(0);

    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += Math.random() * 0.2;
      if (progressValue >= 1) {
        clearInterval(interval);
        setProgress(1);
        setTimeout(() => {
          setLoading(false);
          setProgress(0);
          callback();
        }, 500);
      } else {
        setProgress(progressValue);
      }
    }, 500);
  };

  // Funciones de sincronización
  const sincronizarClientes = () => {
    startLoading(setLoadingClientes, setProgressClientes, async () => {
      Alert.alert("Sincronización", "Obteniendo clientes...");
      await getClientesPanelData("marcos", "marcos");
    });
  };

  const sincronizarArticulos = () => {
    startLoading(setLoadingArticulos, setProgressArticulos, async () => {
      Alert.alert("Sincronización", "Obteniendo artículos...");
      await getArticulosPanelData("marcos", "marcos");
    });
  };

  const sincronizarOfertas = () => {
    startLoading(setLoadingOfertas, setProgressOfertas, async () => {
      Alert.alert("Sincronización", "Obteniendo ofertas...");
      await getOfertasCabPanelData("marcos", "marcos");
    });
  };

  // Función para determinar el color de la barra según el progreso
  const getProgressColor = (progress) => {
    return progress >= 1 ? "#4CAF50" : "#2196F3"; // Verde cuando está al 100%, azul mientras carga
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {/* Botón de sincronización de clientes */}
      <TouchableOpacity
        style={[styles.syncButton, loadingClientes && styles.disabledButton]}
        onPress={sincronizarClientes}
        disabled={loadingClientes}
      >
        <Text style={styles.buttonText}>Sincronizar Clientes</Text>
      </TouchableOpacity>
      {loadingClientes && (
        <View style={styles.progressContainer}>
          <ProgressBar progress={progressClientes} color={getProgressColor(progressClientes)} style={styles.progressBar} />
          <Text>{Math.round(progressClientes * 100)}%</Text>
        </View>
      )}
      {clientes.length > 0 && (
        <View style={styles.syncMessage}>
          <Text style={styles.syncMessageText}>
            ✅ Sincronización Completa - Se descargaron {clientes.length} clientes
          </Text>
        </View>
      )}

      {/* Botón de sincronización de artículos */}
      <TouchableOpacity
        style={[styles.syncButton, loadingArticulos && styles.disabledButton]}
        onPress={sincronizarArticulos}
        disabled={loadingArticulos}
      >
        <Text style={styles.buttonText}>Sincronizar Productos</Text>
      </TouchableOpacity>
      {loadingArticulos && (
        <View style={styles.progressContainer}>
          <ProgressBar progress={progressArticulos} color={getProgressColor(progressArticulos)} style={styles.progressBar} />
          <Text>{Math.round(progressArticulos * 100)}%</Text>
        </View>
      )}
      {articulos.length > 0 && (
        <View style={styles.syncMessage}>
          <Text style={styles.syncMessageText}>
            ✅ Sincronización Completa - Se descargaron {articulos.length} productos
          </Text>
        </View>
      )}

      {/* Botón de sincronización de ofertas */}
      <TouchableOpacity
        style={[styles.syncButton, loadingOfertas && styles.disabledButton]}
        onPress={sincronizarOfertas}
        disabled={loadingOfertas}
      >
        <Text style={styles.buttonText}>Sincronizar Ofertas</Text>
      </TouchableOpacity>
      {loadingOfertas && (
        <View style={styles.progressContainer}>
          <ProgressBar progress={progressOfertas} color={getProgressColor(progressOfertas)} style={styles.progressBar} />
          <Text>{Math.round(progressOfertas * 100)}%</Text>
        </View>
      )}
      {ofertasCab.length > 0 && (
        <View style={styles.syncMessage}>
          <Text style={styles.syncMessageText}>
            ✅ Sincronización Completa - Se descargaron {ofertasCab.length} ofertas
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 30,
  },
  syncButton: {
    backgroundColor: "#f8f8f8",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "90%",
    maxWidth: 400,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  progressContainer: {
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
    marginBottom: 15,
  },
  progressBar: {
    width: "100%",
    height: 10,
    borderRadius: 5,
  },
  syncMessage: {
    backgroundColor: "#DFF0D8",
    padding: 10,
    borderRadius: 10,
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
    marginBottom: 15,
  },
  syncMessageText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3C763D",
  },
});

export default SyncGrid;
