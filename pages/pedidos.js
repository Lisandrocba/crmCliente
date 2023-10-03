import Layout from '@/components/Layout'
import Link from 'next/link'
import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Loading from '@/components/Loading'
import Pedido from '@/components/pedidos/Pedido'

const OBTENER_PEDIDOS = gql`
  query obtenerPedidosVendedor{
    obtenerPedidosVendedor {
      id
      cliente {
        id
        nombre
        apellido
        email
        telefono
      }
      estado
      pedido {
        id
        cantidad
        nombre
      }
      vendedor
      total
      
    }
  }
`


const Pedidos = () => {
  const {data, loading, error} = useQuery(OBTENER_PEDIDOS)
  if(loading) return <Loading />
  const {obtenerPedidosVendedor} = data
  
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800">Pedidos</h1>
        <Link href='/nuevopedido' >
          <p className="py-2 px-5 mt-5 underline hover:text-blue-600 text-blue-400 font-bold">Nuevo Pedido</p>
        </Link>
        {
        obtenerPedidosVendedor.length > 0 
        ? 
        (
          obtenerPedidosVendedor.map(pedido =>{
            return <Pedido key={pedido.id} pedido={pedido}/>
          })
        ) : 
        (
          <p>no hay pedidos</p>
        ) 
      }
      </Layout>
    </div>
  )
}

export default Pedidos
