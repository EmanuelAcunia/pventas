import React, { createContext, useState, useEffect } from 'react';
import {
  initializeDatabase, 
  getTables, 
  getAdmin,
  insertClient, 
  insertProduct, 
  insertOrderCache, 
  insertOrderCacheDetail, 
  updateOrderCacheState,
  updateOrderCacheObs
} from '../databases/db';  // Importa las funciones desde database.js

// Crear el contexto
const DatabaseContext = createContext();

// El Provider que envuelve la app y proporciona la base de datos y las funciones
export const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [tables, setTables] = useState([]);
  const [admin, setAdmin] = useState(null); // Estado para el administrador

  // Funciones de inserción
  const addClient = async (name, address, type, maxDiscount) => {
    if (db) {
      try {
        await insertClient(db, name, address, type, maxDiscount);
        console.log('✅ Cliente insertado correctamente');
      } catch (error) {
        console.error("❌ Error al insertar el cliente:", error);
      }
    }
  };

  const addProduct = async (codigo, descripcion, precioMin, precioMay, stock, state, alicuotaIVA) => {
    if (db) {
      try {
        await insertProduct(db, codigo, descripcion, precioMin, precioMay, stock, state, alicuotaIVA);
        console.log('✅ Producto insertado correctamente');
      } catch (error) {
        console.error("❌ Error al insertar el producto:", error);
      }
    }
  };

  const addOrderCache = async (cliId, devId, selId, mobileCreationDate, condition, state, obs) => {
    if (db) {
      try {
        await insertOrderCache(db, cliId, devId, selId, mobileCreationDate, condition, state, obs);
        console.log('✅ Pedido insertado correctamente');
      } catch (error) {
        console.error("❌ Error al insertar el pedido:", error);
      }
    }
  };

  const addOrderCacheDetail = async (ocaId, prdId, prdCodigo, cantidad, precio, alicuotaIVA, dctoPorc, dctoPesos, totalRenglon, observacion, aofId) => {
    if (db) {
      try {
        await insertOrderCacheDetail(db, ocaId, prdId, prdCodigo, cantidad, precio, alicuotaIVA, dctoPorc, dctoPesos, totalRenglon, observacion, aofId);
        console.log('✅ Detalle de pedido insertado correctamente');
      } catch (error) {
        console.error("❌ Error al insertar el detalle del pedido:", error);
      }
    }
  };

  const updateOrderState = async (ocaId, newState) => {
    if (db) {
      try {
        await updateOrderCacheState(db, ocaId, newState);
        console.log('✅ Estado del pedido actualizado correctamente');
      } catch (error) {
        console.error("❌ Error al actualizar el estado del pedido:", error);
      }
    }
  };

  const updateOrderObs = async (ocaId, newObs) => {
    if (db) {
      try {
        await updateOrderCacheObs(db, ocaId, newObs);
        console.log('✅ Observación del pedido actualizada correctamente');
      } catch (error) {
        console.error("❌ Error al actualizar la observación del pedido:", error);
      }
    }
  };

  useEffect(() => {
    const initDb = async () => {
      try {
        const database = await initializeDatabase();  // Inicializa la base de datos
        setDb(database);  // Establece el objeto de la base de datos
        const tableList = await getTables(database);  // Obtén las tablas
        setTables(tableList);  // Establece las tablas
        const adminData = await getAdmin(database);  // Obtener el admin
        setAdmin(adminData);  // Establece la información del admin
      } catch (error) {
        console.error("❌ Error al inicializar la base de datos", error);
      }
    };

    initDb();  // Inicializa la base de datos cuando el Provider se monta
  }, []);

  return (
    <DatabaseContext.Provider value={{ db, tables, admin, addClient, addProduct, addOrderCache, addOrderCacheDetail, updateOrderState, updateOrderObs }}>
      {children}
    </DatabaseContext.Provider>
  );
};

// Exportar el contexto para ser utilizado en otros componentes
export const useDatabase = () => {
  const context = React.useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase debe ser usado dentro de un DatabaseProvider');
  }
  return context;
};

export default DatabaseContext;
