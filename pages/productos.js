import Layout from '@/components/Layout'
import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Loading from '@/components/Loading'
import Producto from '@/components/Producto'
import Link from 'next/link'

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos{
    obtenerProductos {
      id
      nombre
      stock
      precio
    }
  }
`

const Productos = () => {
  const {data, loading, error} = useQuery(OBTENER_PRODUCTOS)

  if(loading) return <Loading />
  
  return (
    <div>
      <Layout>
      <h1 className="text-2xl text-gray-800">Productos</h1>
      <Link href='/nuevoproducto' >
          <p className="py-2 px-5 mt-5 underline hover:text-blue-600 text-blue-400 font-bold">Agregar producto</p>
      </Link>
      <table className="table-auto shadow-md mt-5 w-full w-lg">
          <thead className='bg-gray-800 text-white'>
            <tr>
              <th className='w-1/4 py-2'>Nombre</th>
              <th className='w-1/5 py-2'>Stock</th>
              <th className='w-1/6 py-2'>Precio</th>
              <th className='w-1/5 py-2'>Eliminar</th>
              <th className='w-1/5 py-2'>Editar</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.obtenerProductos.map(producto=>(
              <Producto key={producto.id} producto={producto} />
            ))
          }
          </tbody>
        </table>
      </Layout>
    </div>
  )
}

export default Productos
