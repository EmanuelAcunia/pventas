import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ClientesGrid = ({ onSelectCliente }) => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [clientes, setClientes] = useState([
    { id: '5', name: 'FACUNDO MARTIN' },
    { id: '284', name: 'Ocaranza Karina' },
    { id: '285', name: 'Despensa Jazmin' },
    { id: '286', name: 'Montoya Osvaldo' },
    { id: '287', name: 'Gomez María' },
    { id: '288', name: 'Perez Marta' },
    { id: '289', name: 'Valdez Elena' },
    { id: '290', name: 'Sayago Cristina 2' }
  ]);

  const filteredClientes = clientes.filter(cliente =>
    cliente.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.openButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.openButtonText}>Seleccionar Cliente</Text>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona un Cliente</Text>
            
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar Cliente"
              value={search}
              onChangeText={setSearch}
            />
            
            <FlatList
              data={filteredClientes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => {
                    onSelectCliente(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.itemText}>Cod: {item.id}. Nombre: {item.name}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={styles.emptyText}>No se encontraron clientes...</Text>}
            />
            
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  openButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  itemContainer: {
    padding: 15,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ClientesGrid;