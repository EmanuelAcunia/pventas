import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PedidoDetalleGrid from "./PedidoDetalleTable/PedidoDetalleGrid";
import ClientesGrid from '../../Clientes/ClientesGrid';

const PedidoForm = () => {
    const [cliente, setCliente] = useState(null);

    return (
        <SafeAreaView style={styles.container}>
            {/* Encabezado */}
            <View style={styles.header}>
                {/* Selección de cliente */}
                {!cliente && (
                    <ClientesGrid onSelectCliente={setCliente} />
                )}

                {cliente && (
                    <>
                        <Text style={styles.headerTitle}>Cliente:</Text>
                        <Text style={styles.clientName}>{cliente.name}</Text>
                    </>
                )}
            </View>

            {/* Contenido principal */}
            <View style={styles.content}>
                {cliente && (
                    <PedidoDetalleGrid />
                )}
                <View style={styles.buttonContainer}>
                    {cliente && (
                        <>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Grabar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

// Estilos mejorados para React Native
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 5
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 0,
        borderRadius: 5
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    clientName: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10
    },
    content: {
        flex: 1,
        marginTop: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 0,
    },
    button: {
        backgroundColor: '#444',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default PedidoForm;
