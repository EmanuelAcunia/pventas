import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const PedidosGrid = ({ navigation }) => { // <-- Recibir navigation como prop
    const [pedidos, setPedidos] = useState([]);
    const [selectedPedidos, setSelectedPedidos] = useState([]);

    useEffect(() => {
        const fetchPedidos = async () => {
            const data = []; // Aquí debes cargar los pedidos desde SQLite
            setPedidos(data);
        };
        fetchPedidos();
    }, []);

    const toggleSelectPedido = (pedidoId) => {
        setSelectedPedidos((prevSelected) =>
            prevSelected.includes(pedidoId)
                ? prevSelected.filter(id => id !== pedidoId)
                : [...prevSelected, pedidoId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedPedidos.length === pedidos.length) {
            setSelectedPedidos([]);
        } else {
            setSelectedPedidos(pedidos.map(pedido => pedido.id));
        }
    };

    const deletePedidos = () => {
        setPedidos(pedidos.filter(pedido => !selectedPedidos.includes(pedido.id)));
        setSelectedPedidos([]);
    };

    return (
        <View style={styles.container}>
            {/* Lista de pedidos */}
            {pedidos.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No se encontraron resultados...</Text>
                </View>
            ) : (
                <FlatList
                    data={pedidos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("PedidoForm", { id: item.id })} // <-- Editar pedido
                        >
                            <View style={[styles.pedidoItem, selectedPedidos.includes(item.id) && styles.selectedItem]}>
                                <Text>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* Botones */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("PedidoForm", { id: null })} // <-- Nuevo pedido
                >
                    <Text style={styles.buttonText}>Nuevo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={deletePedidos}>
                    <Text style={styles.buttonText}>Borrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => console.log('Enviar Pedido')}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={toggleSelectAll}>
                    <Text style={styles.buttonText}>
                        {selectedPedidos.length === pedidos.length ? 'Deselec. Todos' : 'Selec. Todos'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f8f8' },
    header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#000', padding: 10 },
    headerTitle: { flex: 1, textAlign: 'center', color: '#fff', fontSize: 18, fontWeight: 'bold' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 16, color: '#666' },
    pedidoItem: { padding: 15, backgroundColor: '#fff', marginVertical: 5, marginHorizontal: 10, borderRadius: 5, shadowOpacity: 0.1, shadowRadius: 2, elevation: 3 },
    selectedItem: { backgroundColor: '#ddd' },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: '#000' },
    button: { backgroundColor: '#444', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 5 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default PedidosGrid;
