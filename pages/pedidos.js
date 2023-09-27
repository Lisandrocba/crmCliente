import Layout from '@/components/Layout'
import Link from 'next/link'
import React from 'react'


const Pedidos = () => {
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800">Pedidos</h1>
        <Link href='/nuevopedido' >
          <p className="py-2 px-5 mt-5 underline hover:text-blue-600 text-blue-400 font-bold">Nuevo Pedido</p>
      </Link>
      </Layout>
    </div>
  )
}

export default Pedidos
