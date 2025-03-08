import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SettingScreen = ({ navigation }) => {
  const [empresa, setEmpresa] = useState('demo');
  const [host, setHost] = useState('http://sd-1084145-h00001.ferozo.net/testw');
  const [imei, setImei] = useState('');

  const handleSave = () => {
    console.log('Guardando:', { empresa, host, imei });
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>⬅ Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajustes</Text>
      </View>

      {/* Formulario */}
      <View style={styles.form}>
        <Text style={styles.label}>Empresa</Text>
        <TextInput
          style={styles.input}
          value={empresa}
          onChangeText={setEmpresa}
        />

        <Text style={styles.label}>Host servicios</Text>
        <TextInput
          style={styles.input}
          value={host}
          onChangeText={setHost}
        />

        <Text style={styles.label}>IMEI</Text>
        <TextInput
          style={styles.input}
          value={imei}
          onChangeText={setImei}
          keyboardType="numeric"
        />
      </View>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>✔ Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>↩ Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 10,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  button: {
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#888',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SettingScreen;
