import AsignarCliente from '@/components/pedidos/AsignarCliente'
import AsignarProductos from '@/components/pedidos/AsignarProductos'
import Layout from '@/components/Layout'
import ResumenPedido from '@/components/pedidos/ResumenPedido'
import React, { useContext } from 'react'
import Total from '@/components/pedidos/Total'
import PedidoContext from '@/context/pedidos/PedidosContext'


const Nuevopedido = () => {
  
  const pedidoContext = useContext(PedidoContext)
  const {cliente, productos, total} = pedidoContext

  const validacionDatos=()=>{
    return !productos.every(producto => producto.cantidad > 0) || total === 0 || cliente === undefined ? ' opacity-50 cursor-not-allowed ' : ''
  }
   
  return (
    <div>
        <Layout>
        <h1 className="text-2xl text-gray-800">Nuevo Pedido</h1>
        <AsignarCliente />
        <AsignarProductos />
        <ResumenPedido />
        <div className='flex flex-col justify-center items-center w-full mt-5'>
          <Total />
          <button className={`bg-gray-800  mt-5 p-2 text-white uppercase hover:bg-gray-900 rounded-md hover:cursor-pointer w-1/3 ${validacionDatos()}`}>Agregar Pedido</button>
        </div>

      </Layout>
    </div>
  )
}

export default Nuevopedido
