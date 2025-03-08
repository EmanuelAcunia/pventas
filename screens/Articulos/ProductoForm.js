import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const ProductoForm = ({ navigation, articulo, setArticulo, setArticuloPedido, handleSaveItem }) => {
    const [cantidad, setCantidad] = useState(1);
    const [descuento, setDescuento] = useState(0);
    const [observacion, setObservacion] = useState("");

    const precioUnitario = articulo?.precio ?? 0;

    useEffect(() => {
        if (articulo) {
            setCantidad(1);
            setDescuento(0);
            setObservacion("");
        }
    }, [articulo]);

    useEffect(() => {
        if (articulo && articulo.id) {
            setCantidad(articulo.cantidad ?? 1);
            setDescuento(articulo.descuento ?? 0);
            setObservacion(articulo.observacion ?? "");
        }
    }, [articulo]);

    const subtotal = cantidad > 0
        ? precioUnitario * cantidad * ((100 - descuento) / 100)
        : 0;

    const saveArticuloPedido = () => {
        const newItem = {
            id: articulo.id || Date.now(), // Genera un ID único si es nuevo
            codigo: articulo.codigo,
            nombre: articulo.nombre,
            precio: precioUnitario,
            cantidad,
            descuento,
            total: subtotal,
            observacion,
        };

        setArticuloPedido(newItem);
        handleSaveItem(newItem);
        setArticulo(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.productName}>
                {articulo?.codigo} - {articulo?.nombre}
            </Text>

            <Text style={styles.label}>Precio</Text>
            <TextInput style={styles.input} value={precioUnitario.toString()} editable={false} />

            <Text style={styles.label}>Cantidad</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={cantidad.toString()}
                onChangeText={(text) => setCantidad(isNaN(parseFloat(text)) ? 0 : parseFloat(text))}
            />

            <Text style={styles.label}>Descuento</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={descuento.toString()}
                onChangeText={(text) => setDescuento(isNaN(parseFloat(text)) ? 0 : parseFloat(text))}
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

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={saveArticuloPedido}>
                    <Text style={styles.buttonText}>{articulo?.id ? "Modificar" : "Agregar"}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8f8f8", padding: 20 },
    productName: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, textAlign: "center", marginVertical: 5 },
    observacionInput: { borderWidth: 1, borderColor: "#ccc", padding: 10, minHeight: 80, textAlignVertical: "top" },
    buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
    button: { flex: 1, padding: 12, backgroundColor: "blue", alignItems: "center", marginHorizontal: 5, borderRadius: 5 },
    cancelButton: { backgroundColor: "red" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default ProductoForm;
