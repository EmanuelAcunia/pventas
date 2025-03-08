// Clientes
export const createClientTable = `
PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS client (
    CLI_ID INTEGER PRIMARY KEY AUTOINCREMENT, 
    CLI_NAME TEXT, 
    CLI_DIRECCION TEXT, 
    CLI_TYPE INTEGER, 
    CLI_MAXPORCDESCTO REAL(5,2)
  )`;

// Articulos
export const createProductTable = `
PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS product (
    PRD_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
    PRD_CODIGO TEXT NOT NULL, 
    PRD_DESCRIPCION TEXT, 
    PRD_PRECIOMIN REAL(10,2), 
    PRD_PRECIOMAY REAL(10,2), 
    PRD_STOCK REAL(10,2), 
    PRD_STATE INTEGER, 
    PRD_ALICUOTA_IVA REAL(4,2)
  )`;

// OrderCache
export const createOrderCacheTable = `
PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS order_cache (
    OCA_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
    OCA_CLI_ID INTEGER NOT NULL, 
    OCA_DEV_ID INTEGER, 
    OCA_SEL_ID INTEGER, 
    OCA_MOBILE_CREATION_DATE DATETIME, 
    OCA_CONDITION INTEGER, 
    OCA_STATE INTEGER, 
    OCA_OBS TEXT
  )`;
export const createOrderCacheIndex = `
PRAGMA journal_mode = WAL;
  CREATE INDEX IF NOT EXISTS UK_ORDCACHE 
  ON order_cache (OCA_CLI_ID, OCA_DEV_ID, OCA_SEL_ID, OCA_MOBILE_CREATION_DATE)`;

// OrderCacheDetail
export const createOrderCacheDetailTable = `
PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS order_cache_detail (
    OCD_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
    OCD_OCA_ID INTEGER NOT NULL, 
    OCD_PRD_ID INTEGER, 
    OCD_PRD_CODIGO TEXT, 
    OCD_CANTIDAD INTEGER, 
    OCD_PRECIO REAL(10,2), 
    OCD_ALICUOTA_IVA REAL(10,2), 
    OCD_DCTO_PORC REAL(10,2), 
    OCD_DCTO_PESOS REAL(10,2), 
    OCD_TOTAL_RENGLON REAL(10,2), 
    OCD_OBSERVACION TEXT DEFAULT '', 
    AOF_ID INTEGER DEFAULT NULL
  )`;

// Oferta
export const createOfertaCabeceraTable = `
PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS articulos_ofertas_cab (
    AOF_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
    AOF_OFERTA_DESDE DATETIME, 
    AOF_OFERTA_HASTA DATETIME, 
    AOF_TIPOPRECIO INTEGER
  )`;
export const createOfertaDetalleTable = `
PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS articulos_ofertas_det (
    AOFD_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
    AOFD_AOF_ID INTEGER NOT NULL, 
    AOFD_ART_ID INTEGER, 
    AOFD_OFERTAPRECIO REAL(10,2)
  )`;

// Usuario
export const createUsuarioTable = `
PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS usuario (
    USR_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
    USR_NOM UNIQUE, 
    USR_PASS, 
    USR_LEVEL, 
    SEL_DCTO REAL(5,2), 
    SEL_DCTO_APLICA INTEGER
  )`;
export const insertAdminUser = `
PRAGMA journal_mode = WAL;
  INSERT OR IGNORE INTO usuario (USR_NOM, USR_PASS, USR_LEVEL) 
  VALUES('admin', '4Dm1n', 1)`;

export const insertCustomUser = `
PRAGMA journal_mode = WAL;
  INSERT OR REPLACE INTO usuario (USR_NOM, USR_PASS, USR_LEVEL) 
  VALUES(?, ?, 0)`;

export const insertClient = `
PRAGMA journal_mode = WAL;
  INSERT OR REPLACE INTO client (CLI_NAME, CLI_DIRECCION, CLI_TYPE, CLI_MAXPORCDESCTO)
  VALUES (?, ?, ?, ?)
`;


// Configuración
export const createConfigTable = `
PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS config (
    EMP_ID INTEGER UNIQUE, 
    EMP_NOMBRE TEXT, 
    EMP_HOST TEXT
  )`;
export const insertConfig = `
PRAGMA journal_mode = WAL;
  INSERT OR IGNORE INTO config (EMP_ID, EMP_NOMBRE, EMP_HOST) 
  VALUES (1, 'demo', 'http://sd-1084145-h00001.ferozo.net/')`;

// Pedidos
export const insertOrderCache = `
PRAGMA journal_mode = WAL;
  INSERT INTO order_cache 
  (OCA_CLI_ID, OCA_DEV_ID, OCA_SEL_ID, OCA_MOBILE_CREATION_DATE, OCA_CONDITION, OCA_STATE, OCA_OBS) 
  VALUES (?, ?, ?, ?, ?, ?, ?)`;

export const insertOrderCacheDetail = `
  INSERT INTO order_cache_detail 
  (OCD_OCA_ID, OCD_PRD_ID, OCD_PRD_CODIGO, OCD_CANTIDAD, OCD_PRECIO, OCD_ALICUOTA_IVA, OCD_DCTO_PORC, OCD_DCTO_PESOS, OCD_TOTAL_RENGLON, OCD_OBSERVACION, AOF_ID) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

export const getLastInsertIDOrderCache = `
  SELECT MAX(OCA_ID) AS OCA_ID FROM order_cache`;

export const updateOrderCacheState = `
  UPDATE order_cache 
  SET OCA_STATE = ? 
  WHERE OCA_ID = ?`;

export const updateOrderCacheObs = `
  UPDATE order_cache 
  SET OCA_OBS = ? 
  WHERE OCA_ID = ?`;

  export const readAdmin = `
  SELECT * FROM  usuario
  `;
  export const readClientes = `
  SELECT * FROM client
  `;
    