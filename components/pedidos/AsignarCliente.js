import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { gql, useQuery } from '@apollo/client'
import Loading from '../Loading';
import PedidoContext from '@/context/pedidos/PedidosContext';

const QUERY_CLIENTES = gql`
  query obtenerClientesPorVendedor {
    obtenerClientesPorVendedor {
      id
      nombre
      apellido
      email
      telefono
    }
  }
`;

const AsignarCliente = () => {
    
      const [cliente, setCliente] = useState()
      const {data, loading} = useQuery(QUERY_CLIENTES)
      const pedidoContext = useContext(PedidoContext)
      const {agregarCliente} = pedidoContext

      useEffect(()=>{
        agregarCliente(cliente)
      },[cliente])

      const seleccionarCliente=cliente=>{
        setCliente(cliente)
      }

      if(loading) return <Loading />

      const {obtenerClientesPorVendedor} = data
  return (
    <div>
        <p className='mt-10 my-2 p-2 bg-white border-l-4 border-gray-800 text-gray-700 font-bold text-sm'>1- Asigna un Cliente al pedido</p>
        <Select 
            options={obtenerClientesPorVendedor}
            onChange={opcion => seleccionarCliente(opcion)}
            getOptionValue={opciones=> opciones.id}
            getOptionLabel={opciones => opciones.nombre}
            placeholder='Busque o selecciones el cliente'
            noOptionsMessage={()=> 'No hay resultados'}
        />
    </div>
  )
}

export default AsignarCliente
