import React, { createContext, useState, useContext } from 'react';

const PedidoCabContext = createContext();

const PedidoCabProvider = ({ children }) => {
  const [listaPedidos, setListaPedidos] = useState([]);

  return (
    <PedidoCabContext.Provider value={{ listaPedidos, setListaPedidos }}>
      {children}
    </PedidoCabContext.Provider>
  );
};

export default PedidoCabProvider;