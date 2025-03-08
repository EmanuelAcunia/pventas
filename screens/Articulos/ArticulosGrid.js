import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ArticulosGrid = ({ onSelectArticulo }) => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [articulos, setArticulos] = useState([
    { id:1, codigo: '5', nombre: 'Coca', precio: '200', cantidad: '10', descuento: '0', total: '2000' },
    { id:2, codigo: '284', nombre: 'Pepsi', precio: '200', cantidad: '10', descuento: '0', total: '2000' },
    { id:3, codigo: '285', nombre: 'PAck', precio: '200', cantidad: '10', descuento: '0', total: '2000' },
    { id:4, codigo: '286', nombre: 'Montoya Osvaldo', precio: '200', cantidad: '10', descuento: '0', total: '2000' },
    { id:5, codigo: '287', nombre: 'Gomez María', precio: '200', cantidad: '10', descuento: '0', total: '2000' },
    { id:6, codigo: '288', nombre: 'Perez Marta', precio: '200', cantidad: '10', descuento: '0', total: '2000' },
    { id:7, codigo: '289', nombre: 'Valdez Elena', precio: '200', cantidad: '10', descuento: '0', total: '2000' },
    { id:8, codigo: '290', nombre: 'Sayago Cristina 2', precio: '200', cantidad: '10', descuento: '0', total: '2000' },
  ]);

  const filteredArticulos = articulos.filter(cliente =>
    cliente.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.openButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.openButtonText}>Agregar Articulos</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar Articulo</Text>

            <TextInput
              style={styles.searchInput}
              placeholder="Buscar Articulo"
              value={search}
              onChangeText={setSearch}
            />

            <FlatList
              data={filteredArticulos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => {
                    onSelectArticulo(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.itemText}>Cod: {item.id}. Nombre: {item.nombre}. Cantidad: {item.cantidad}</Text>

                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={styles.emptyText}>No se encontraron articulos...</Text>}
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

export default ArticulosGrid;