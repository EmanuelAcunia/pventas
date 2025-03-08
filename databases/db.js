import * as SQLite from 'expo-sqlite';
import * as Queries from './queries'; // Importar las consultas

// Función para inicializar la base de datos
export const initializeDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('egestion');  // Abrir base de datos

    // Crear las tablas si no existen
    await db.execAsync(Queries.createUsuarioTable);  // Crear tabla de usuarios
    await db.execAsync(Queries.insertAdminUser);     // Insertar usuario administrador
    await db.execAsync(Queries.createClientTable);   // Crear tabla de clientes
    await db.execAsync(Queries.createProductTable);  // Crear tabla de productos
    await db.execAsync(Queries.createOrderCacheTable);  // Crear tabla de caché de pedidos
    await db.execAsync(Queries.createOrderCacheIndex);  // Crear índice de caché de pedidos
    await db.execAsync(Queries.createOrderCacheDetailTable);  // Crear tabla de detalles de caché de pedidos
    await db.execAsync(Queries.createOfertaCabeceraTable);  // Crear tabla de cabecera de ofertas
    await db.execAsync(Queries.createOfertaDetalleTable);  // Crear tabla de detalles de ofertas
    await db.execAsync(Queries.createConfigTable);  // Crear tabla de configuración

    console.log('✅ Base de datos inicializada correctamente');
    return db;  // Devuelve el objeto de la base de datos
  } catch (error) {
    console.error("❌ Error al inicializar la base de datos:", error);
    throw error;
  }
};

// Función para obtener las tablas de la base de datos
export const getTables = async (db) => {
  try {
    const result = await db.getAllAsync("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;");
    return result.map(row => row.name);  // Devolver solo los nombres de las tablas
  } catch (error) {
    console.error("❌ Error al obtener las tablas:", error);
    return [];
  }
};

// Función para obtener el administrador
export const getAdmin = async (db) => {
  try {
    const result = await db.getAllAsync(Queries.readAdmin);  // Usar la consulta para obtener el admin
    return result;  // Devolver el resultado
  } catch (error) {
    console.error("❌ Error al obtener el admin:", error);
    return [];
  }
};

// Función para obtener los clientes
export const getClients = async (db) => {
  try {
    const result = await db.getAllAsync(Queries.readClientes);  // Usar la consulta para obtener los clientes
    return result;
  } catch (error) {
    console.error("❌ Error al obtener los clientes:", error);
    return [];
  }
};

// Función para insertar un cliente
export const insertClient = async (db, name, address, type, maxDiscount) => {
  try {
    await db.execAsync(Queries.insertClient, [name, address, type, maxDiscount]);
    console.log('✅ Cliente insertado correctamente');
  } catch (error) {
    console.error("❌ Error al insertar el cliente:", error);
  }
};

// Función para insertar un producto
export const insertProduct = async (db, codigo, descripcion, precioMin, precioMay, stock, state, alicuotaIVA) => {
  try {
    await db.execAsync(Queries.insertProduct, [codigo, descripcion, precioMin, precioMay, stock, state, alicuotaIVA]);
    console.log('✅ Producto insertado correctamente');
  } catch (error) {
    console.error("❌ Error al insertar el producto:", error);
  }
};

// Función para insertar un pedido en caché
export const insertOrderCache = async (db, cliId, devId, selId, mobileCreationDate, condition, state, obs) => {
  try {
    await db.execAsync(Queries.insertOrderCache, [cliId, devId, selId, mobileCreationDate, condition, state, obs]);
    console.log('✅ Pedido insertado correctamente');
  } catch (error) {
    console.error("❌ Error al insertar el pedido:", error);
  }
};

// Función para insertar un detalle de pedido en caché
export const insertOrderCacheDetail = async (db, ocaId, prdId, prdCodigo, cantidad, precio, alicuotaIVA, dctoPorc, dctoPesos, totalRenglon, observacion, aofId) => {
  try {
    await db.execAsync(Queries.insertOrderCacheDetail, [ocaId, prdId, prdCodigo, cantidad, precio, alicuotaIVA, dctoPorc, dctoPesos, totalRenglon, observacion, aofId]);
    console.log('✅ Detalle de pedido insertado correctamente');
  } catch (error) {
    console.error("❌ Error al insertar el detalle del pedido:", error);
  }
};

// Función para obtener el último ID insertado de pedido en caché
export const getLastInsertIDOrderCache = async (db) => {
  try {
    const result = await db.getAsync(Queries.getLastInsertIDOrderCache);
    return result.OCA_ID;  // Devuelve el ID del último pedido insertado
  } catch (error) {
    console.error("❌ Error al obtener el último ID de pedido:", error);
    return null;
  }
};

// Función para actualizar el estado de un pedido en caché
export const updateOrderCacheState = async (db, ocaId, newState) => {
  try {
    await db.execAsync(Queries.updateOrderCacheState, [newState, ocaId]);
    console.log('✅ Estado de pedido actualizado correctamente');
  } catch (error) {
    console.error("❌ Error al actualizar el estado del pedido:", error);
  }
};

// Función para actualizar la observación de un pedido en caché
export const updateOrderCacheObs = async (db, ocaId, newObs) => {
  try {
    await db.execAsync(Queries.updateOrderCacheObs, [newObs, ocaId]);
    console.log('✅ Observación del pedido actualizada correctamente');
  } catch (error) {
    console.error("❌ Error al actualizar la observación del pedido:", error);
  }
};
