import React, { createContext, useState } from 'react';

export const PedidoDetContext = createContext(); // Exportar el contexto

const PedidoDetProvider = ({ children }) => {
  const [detalleArticulos, setDetalleArticulos] = useState([]);

  // Agregar un artículo
  const agregarArticulo = (articulo) => {
    setDetalleArticulos((prevArticulos) => [...prevArticulos, articulo]);
  };

  // Editar un artículo (usando el id del artículo como identificador)
  const editarArticulo = (id, updatedArticulo) => {
    setDetalleArticulos((prevArticulos) =>
      prevArticulos.map((articulo) =>
        articulo.id === id ? { ...articulo, ...updatedArticulo } : articulo
      )
    );
  };

  // Eliminar un artículo (usando el id del artículo como identificador)
  const eliminarArticulo = (id) => {
    setDetalleArticulos((prevArticulos) =>
      prevArticulos.filter((articulo) => articulo.id !== id)
    );
  };

  // Ver un artículo (buscando el artículo por su id)
  const verArticulo = (id) => {
    return detalleArticulos.find((articulo) => articulo.id === id);
  };

  // Vaciar el array de artículos
  const vaciarDetalleArticulos = () => {
    setDetalleArticulos([]);
  };

  return (
    <PedidoDetContext.Provider
      value={{
        detalleArticulos,
        setDetalleArticulos,
        agregarArticulo,
        editarArticulo,
        eliminarArticulo,
        verArticulo,
        vaciarDetalleArticulos,
      }}
    >
      {children}
    </PedidoDetContext.Provider>
  );
};

export default PedidoDetProvider;

