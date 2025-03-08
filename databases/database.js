// database.js
import { createRxDatabase, addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'; // Usando Dexie como almacenamiento
import Dexie from 'dexie';

addRxPlugin(RxDBDevModePlugin); // Habilita el modo desarrollador

const dbName = 'egestiondb';
let dbInstance = null;

export const initDatabase = async () => {
  if (!dbInstance) {
    dbInstance = await createRxDatabase({
      name: dbName,
      storage: getRxStorageDexie(), // Cambiado a Dexie para compatibilidad
    });

    await dbInstance.addCollections({
      clientes: {
        schema: {
          title: 'Clientes Schema',
          version: 0,
          primaryKey: 'id',
          type: 'object',
          properties: {
            id: { type: 'string' },
            nombre: { type: 'string' },
            email: { type: 'string' },
            direccion: { type: 'string' },
            tipo: { type: 'string' },
            sel_id: { type: 'string' },
            max_descuento: { type: 'number' }
          },
          required: ['id', 'nombre', 'direccion']
        }
      }
    });
  }
  return dbInstance;
};