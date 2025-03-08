import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProductoForm = ({ navigation, route }) => {
    const { articulo, pedido, setPedido } = route.params;
    
    if (!articulo) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: No se ha seleccionado un artículo</Text>
            </View>
        );
    }

    const [cantidad, setCantidad] = useState(1);
    const [descuento, setDescuento] = useState(0);
    const [observacion, setObservacion] = useState("");

    const precioUnitario = articulo.precio ?? 0;
    const subtotal = cantidad > 0 ? precioUnitario * cantidad * ((100 - descuento) / 100) : 0;

    const agregarArticuloAlPedido = () => {
        const nuevoArticulo = {
            id: articulo.id,
            name: articulo.name,
            cantidad,
            descuento,
            subtotal,
            observacion,
        };

        // Asegurar que 'productos' existe en el pedido
        const nuevoPedido = { ...pedido, productos: [...(pedido.productos || []), nuevoArticulo] };
        setPedido(nuevoPedido);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                    <Text style={styles.backText}>Volver</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Producto</Text>
            </View>

            {/* Nombre del producto */}
            <Text style={styles.productName}>{articulo.codigo} - {articulo.name}</Text>

            {/* Inputs */}
            <Text style={styles.label}>Precio</Text>
            <TextInput style={styles.input} value={precioUnitario.toString()} editable={false} />

            <Text style={styles.label}>Cantidad</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={cantidad.toString()}
                onChangeText={(text) => setCantidad(text === "" ? "" : parseFloat(text))}
            />

            <Text style={styles.label}>Descuento (%)</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={descuento.toString()}
                onChangeText={(text) => setDescuento(text === "" ? "" : parseFloat(text))}
            />

            <Text style={styles.label}>Total</Text>
            <TextInput style={styles.input} value={subtotal.toFixed(2)} editable={false} />

            <Text style={styles.label}>Observación</Text>
            <TextInput
                style={styles.observacionInput}
                value={observacion}
                onChangeText={setObservacion}
                multiline
            />

            {/* Botones */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={agregarArticuloAlPedido}>
                    <Text style={styles.buttonText}>Agregar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8f8f8", padding: 20 },
    header: { flexDirection: "row", alignItems: "center", backgroundColor: "#000", padding: 10 },
    backButton: { flexDirection: "row", alignItems: "center", padding: 10 },
    backText: { color: "#fff", fontSize: 16, marginLeft: 5 },
    headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold", marginLeft: 10 },
    productName: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
    label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, textAlign: "center", marginVertical: 5 },
    observacionInput: { borderWidth: 1, borderColor: "#ccc", padding: 10, minHeight: 80, textAlignVertical: "top" },
    buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
    button: { flex: 1, padding: 10, backgroundColor: "#444", alignItems: "center", marginHorizontal: 5 },
    buttonText: { color: "#fff", fontWeight: "bold" },
    errorText: { color: "red", fontSize: 16, textAlign: "center", marginTop: 20 },
});

export default ProductoForm;
