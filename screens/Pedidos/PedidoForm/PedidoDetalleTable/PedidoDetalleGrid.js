import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductoForm from '../../../Articulos/ProductoForm';
import ArticulosGrid from '../../../Articulos/ArticulosGrid';

const PedidoDetalleGrid = () => {
  const [detalleArticulos, setDetalleArticulos] = useState([]);
  const [articulo, setArticulo] = useState(null);
  const [articuloPedido, setArticuloPedido] = useState(null);

  useEffect(() => {
    setDetalleArticulos([
      { id: 1, codigo: 'A001', nombre: "Artículo 1", precio: 50, cantidad: 2, descuento: 0, total: 100 },
      { id: 2, codigo: 'A002', nombre: "Artículo 2", precio: 100, cantidad: 2, descuento: 5, total: 190 },
    ]);
  }, []);

  const calcularTotalGeneral = useMemo(() =>
    detalleArticulos.reduce((acc, item) => acc + item.total, 0), [detalleArticulos]
  );

  const handleSaveItem = (newItem) => {
    setDetalleArticulos(prevState => {
      if (prevState.some(item => item.id === newItem.id)) {
        return prevState.map(item => (item.id === newItem.id ? newItem : item));
      } else {
        return [...prevState, newItem];
      }
    });

    setArticulo(null);
    setArticuloPedido(null);
  };

  const handleDeleteItem = (id) => {
    setDetalleArticulos(prevState => prevState.filter(item => item.id !== id));
  };

  const handleEditItem = (item) => {
    setArticuloPedido(item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cargar Pedido</Text>
      </View>

      {articulo || articuloPedido ? (
        <ProductoForm
          articulo={articulo || articuloPedido}
          setArticulo={setArticulo}
          setArticuloPedido={setArticuloPedido}
          handleSaveItem={handleSaveItem}
        />
      ) : (
        <>
          <FlatList
            data={detalleArticulos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemText}>{item.codigo} - {item.nombre}</Text>
                  <Text style={styles.itemText}>
                    Precio: {item.precio} | Cantidad: {item.cantidad} | Desc: {item.descuento}% | Total: ${item.total.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={() => handleEditItem(item)}>
                    <Icon name="pencil" size={24} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                    <Icon name="close" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <Text style={styles.totalGeneral}>Total General: ${calcularTotalGeneral.toFixed(2)}</Text>

          <View style={styles.buttonContainer}>
            <ArticulosGrid onSelectArticulo={setArticulo} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: { backgroundColor: '#000', padding: 10 },
  headerTitle: { textAlign: 'center', color: '#fff', fontSize: 18, fontWeight: 'bold' },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#fff', margin: 10, borderRadius: 5, elevation: 3 },
  itemDetails: { flex: 1 },
  itemText: { fontSize: 14, color: '#333' },
  iconContainer: { flexDirection: 'row', gap: 15 },
  totalGeneral: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', padding: 10 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
  },
});

export default PedidoDetalleGrid;
