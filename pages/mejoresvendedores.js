import Layout from "@/components/Layout";
import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { gql,useQuery } from "@apollo/client";
import Loading from "@/components/Loading";

const MEJORES_VENDEDORES = gql`
    query mejoresVendedores{
        mejoresVendedores {
            vendedor {
            nombre
            }
            total
        }
    }
`

const MejoresVendedores = () => {
    const {data, loading, startPolling, stopPolling} = useQuery(MEJORES_VENDEDORES)

    useEffect(()=>{
        startPolling(1000)
        return ()=>{
            stopPolling()
        }
    }, [startPolling, stopPolling])

    if(loading) return <Loading />

    const dataGraf = []

    data.mejoresVendedores.map((vendedor, index) => {
        dataGraf[index] = {
            ...vendedor.vendedor[0],
            total: vendedor.total
        }
    })

    

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800">Mejores vendedores</h1>

      <BarChart
        className="md:mt-10"
        width={500}
        height={300}
        data={dataGraf}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
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
  );
};

export default MejoresVendedores;
