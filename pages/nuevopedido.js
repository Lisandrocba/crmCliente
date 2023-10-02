import AsignarCliente from "@/components/pedidos/AsignarCliente";
import AsignarProductos from "@/components/pedidos/AsignarProductos";
import Layout from "@/components/Layout";
import ResumenPedido from "@/components/pedidos/ResumenPedido";
import React, { useContext, useState } from "react";
import Total from "@/components/pedidos/Total";
import PedidoContext from "@/context/pedidos/PedidosContext";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const NUEVO_PEDIDO = gql`
  mutation nuevoPedido($input: PedidoInput) {
    nuevoPedido(input: $input) {
      id
    }
  }
`;

const Nuevopedido = () => {
  const pedidoContext = useContext(PedidoContext);
  const { cliente, productos, total } = pedidoContext;
  const [nuevoPedido] = useMutation(NUEVO_PEDIDO);
  const [msj, setMsj] = useState(null)
  const router = useRouter()

  const validacionDatos = () => {
    return !productos.every((producto) => producto.cantidad > 0) ||
      total === 0 ||
      cliente === undefined
      ? " opacity-50 cursor-not-allowed "
      : "";
  };

  const btnNuevoPedido =async()=>{
    const {id} = cliente
    const pedido = productos.map(({stock, __typename, ...producto})=> producto)
    try {
      const {data} = await nuevoPedido({
        variables: {
          input: {
            cliente: id,
            total,
            pedido
          }
        }
      })
      router.push('/pedidos')
      Swal.fire(
        'Correcto',
        'Pedido confirmado con exito',
        'success'
      )
    } catch (error) {
      setMsj(error.message.replace('ApolloError: ', ''))
      setTimeout(()=>{
        setMsj(null)
      }, 3000)
    }
  }

  const mostrarMensaje =()=>{
    return(
      <div className="py-2 px-3 w-full my-3 max-w-sm text-center mx-auto border-solid border-l-2 border-red-800">
        <p>{msj}</p>
      </div>
    )
  }

  return (
    <div>
      <Layout>
      {msj && mostrarMensaje()}
        <h1 className="text-2xl text-gray-800">Nuevo Pedido</h1>
        <AsignarCliente />
        <AsignarProductos />
        <ResumenPedido />
        <div className="flex flex-col justify-center items-center w-full mt-5">
          <Total />
          <button
            className={`bg-gray-800  mt-5 p-2 text-white uppercase hover:bg-gray-900 rounded-md hover:cursor-pointer w-1/3 ${validacionDatos()}`}
            onClick={()=> btnNuevoPedido()}
          >
            Agregar Pedido
          </button>
        </div>
      </Layout>
    </div>
  );
};

export default Nuevopedido;
