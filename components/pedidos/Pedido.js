import React from 'react'

const Pedido = ({pedido}) => {
    const {cliente, estado, cantidad, total} = pedido
  return (
    <div className='bg-gray-100 shadow-sm rounded'>
        <div className='w-1/2 px-2 py-5  my-5'>
            <p className='mb-5'>{cliente}</p>
            <select className='appearance-none bg-blue-500 uppercase text-center text-white px-2 py-2 rounded w-auto'>
                <option value='COMPLETADO'>COMPLETADO</option>
                <option value='PENDIENTE'>PENDIENTE</option>
                <option value='CANCELADO'>CANCELADO</option>
            </select>
        </div>

        <div>
            
        </div>
    </div>
  )
}

export default Pedido
