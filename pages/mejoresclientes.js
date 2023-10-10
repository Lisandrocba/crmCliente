import Layout from '@/components/Layout'
import React, { useEffect } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";
import { gql, useQuery } from '@apollo/client';
import Loading from '@/components/Loading';

const MEJORES_CLIENTES = gql`
    query mejoresClientes{
        mejoresClientes {
            cliente {
            nombre
            }
            total
        }
    }
`




const MejoresClientes = () => {
    const {data, loading, startPolling, stopPolling} = useQuery(MEJORES_CLIENTES)
    useEffect(()=>{
        startPolling(1000)
        return ()=>{
            stopPolling()
        }
    }, [startPolling, stopPolling])
    if(loading) return <Loading />
    const clientesGraf = []
    data.mejoresClientes.map((cliente, index)=>{
        clientesGraf[index] = {
           ...cliente.cliente[0],
           total: cliente.total
        }
    })

  return (
    <Layout>
         <h1 className="text-2xl text-gray-800">Mejores clientes</h1>
         <BarChart
            className='md:mt-10'
            width={500}
            height={300}
            data={clientesGraf}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
    </Layout>
  )
}

export default MejoresClientes
