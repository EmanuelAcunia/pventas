
import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, Button, StyleSheet } from 'react-native';

const ArticuloForm = ({ form, onSave, onCancel }) => {
  const [localForm, setLocalForm] = useState(form);

  useEffect(() => {
    setLocalForm(form);
  }, [form]);

  return (
    <SafeAreaView style={styles.formContainer}>
      <TextInput style={styles.input} value={form.codigo} onChangeText={(text) => setForm({ ...form, codigo: text })} placeholder="Código" />
      <TextInput style={styles.input} value={form.nombre} onChangeText={(text) => setForm({ ...form, nombre: text })} placeholder="Nombre" />
      <TextInput style={styles.input} value={form.cantidad} onChangeText={(text) => setForm({ ...form, cantidad: text })} placeholder="Cantidad" keyboardType="numeric" />
      <TextInput style={styles.input} value={form.descuento} onChangeText={(text) => setForm({ ...form, descuento: text })} placeholder="Descuento (%)" keyboardType="numeric" />
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveItem}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => setIsFormOpen(false)}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 15,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 5,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },    
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
},
});

export default ArticuloForm;
