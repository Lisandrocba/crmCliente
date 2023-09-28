import AsignarCliente from '@/components/AsignarCliente'
import AsignarProductos from '@/components/AsignarProductos'
import Layout from '@/components/Layout'
import ResumenPedido from '@/components/ResumenPedido'
import React from 'react'


const Nuevopedido = () => {
   
  return (
    <div>
        <Layout>
        <h1 className="text-2xl text-gray-800">Nuevo Pedido</h1>
        <AsignarCliente />
        <AsignarProductos />
        <ResumenPedido />
      </Layout>
    </div>
  )
}

export default Nuevopedido
