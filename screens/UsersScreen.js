import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const UsersScreen = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [usuarios, setUsuarios] = useState([{ id: '1', name: 'facundo', selected: false }]);

  const handleAddUser = () => {
    if (usuario.trim() && password.trim()) {
      setUsuarios([...usuarios, { id: Date.now().toString(), name: usuario, selected: false }]);
      setUsuario('');
      setPassword('');
    }
  };

  const handleSelectUser = (id) => {
    setUsuarios(usuarios.map(user => user.id === id ? { ...user, selected: !user.selected } : user));
  };

  const handleDeleteUsers = () => {
    setUsuarios(usuarios.filter(user => !user.selected));
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>⬅ Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Administración de Usuarios</Text>
      </View>

      {/* Formulario */}
      <View style={styles.form}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.input}
          value={usuario}
          onChangeText={setUsuario}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Botón Agregar */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
        <Text style={styles.addButtonText}>✔ Agregar</Text>
      </TouchableOpacity>

      {/* Lista de Usuarios */}
      <Text style={styles.userListTitle}>Lista de usuarios</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userItem} onPress={() => handleSelectUser(item.id)}>
            <Text style={[styles.userText, item.selected && styles.selectedUser]}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Botón Borrar */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteUsers}>
        <Text style={styles.deleteButtonText}>🗑 Borrar</Text>
      </TouchableOpacity>
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
  addButton: {
    backgroundColor: '#444',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  userListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userItem: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
  },
  userText: {
    fontSize: 16,
  },
  selectedUser: {
    backgroundColor: '#d3d3d3',
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UsersScreen;
