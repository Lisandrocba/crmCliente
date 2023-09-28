import React, { useContext, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Loading from "./Loading";
import Select from "react-select";
import PedidoContext from "@/context/pedidos/PedidosContext";

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      stock
      precio
    }
  }
`;

const AsignarProductos = () => {
  const [productos, setProductos] = useState([]);
  const { data, loading } = useQuery(OBTENER_PRODUCTOS);
  const pedidosContext = useContext(PedidoContext);
  const { agregarProductos } = pedidosContext;

  useEffect(() => {
    agregarProductos(productos);
  }, [productos]);

  if (loading) return <Loading />;

  const { obtenerProductos } = data;

  const seleccionarProducto = (productos) => {
    setProductos(productos);
  };
  return (
    <div>
      <p className="mt-7 my-2 p-2 bg-white border-l-4 border-gray-800 text-gray-700 font-bold text-sm">
        2- Seleccionar o buscar Productos
      </p>
      <Select
        options={obtenerProductos}
        isMulti="true"
        onChange={(opcion) => seleccionarProducto(opcion)}
        getOptionValue={(opciones) => opciones.id}
        getOptionLabel={(opciones) => `${opciones.nombre} - stock: ${opciones.stock}`}
        placeholder="Busque o selecciones el producto"
        noOptionsMessage={() => "No hay resultados"}
      />
    </div>
  );
};

export default AsignarProductos;
