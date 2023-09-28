import React, { useContext } from 'react'
import PedidoContext from '@/context/pedidos/PedidosContext'
import ProductoResumen from './ProductoResumen'

const ResumenPedido = () => {
    const pedidoContext = useContext(PedidoContext)
    const {productos} = pedidoContext
  return (
    <div>
      <p className='mt-7 my-2 p-2 bg-white border-l-4 border-gray-800 text-gray-700 font-bold text-sm'>3- Ajusta la cantidad de Productos</p>
      {
        productos.length > 0 ?
        (productos.map(producto=>(
            <ProductoResumen key={producto.id} producto={producto} />
        ))) :
        <p>No hay pedidos agregados</p>
      }
    </div>
  )
}

export default ResumenPedido
