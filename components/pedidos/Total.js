import React, { useContext } from 'react'
import PedidoContext from '@/context/pedidos/PedidosContext'

const Total = () => {
  const pedidoContext = useContext(PedidoContext)

  const {total} = pedidoContext
  console.log(total)

  return (
    <div className='flex items-center mt-5 justify-between bg-gray-300 border-solid border-2 border-gray-500 p-3 w-1/3'>
    <p className='text-gray-800 text-lg '>Total:</p>
    <p className='text-gray-800 mt-0'>$ {total}</p>
    </div>
  )
}

export default Total
