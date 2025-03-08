// /src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Pantallas Generales
import LoginScreen from '../screens/Login/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

// Pantallas Principales para Admin
import SettingScreen from '../screens/SettingScreen';
import UsersScreen from '../screens/UsersScreen';

// Pantallas Principales para Vendedor
import PedidosScreen from '../screens/Pedidos/PedidosScreen';
import SyncScreen from '../screens/Sync/SyncScreen';

// Formulario para Vendedor
import PedidoFormScreen from '../screens/Pedidos/PedidoForm/PedidoFormScreen';
import ProductoScreen from '../screens/Pedidos/PedidoForm/PedidoDetalleForm/ProductoScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" 
        screenOptions={{ headerShown: false }} // Oculta el header en todas las pantallas
      >
        {/* Pantallas Generales */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>

        {/* Pantallas Admin */}
        <Stack.Screen name="Ajustes" component={SettingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Usuarios" component={UsersScreen} options={{ headerShown: false }}/>

        {/* Pantallas Vendedor */}
        <Stack.Screen name="Sincronizacion" component={SyncScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Pedidos" component={PedidosScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="PedidoForm" component={PedidoFormScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Producto" component={ProductoScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
