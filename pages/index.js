import Clientes from "@/components/Clientes";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";

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

const Index = () => {
  const { data, loading, error } = useQuery(QUERY_CLIENTES);  
 
  if (loading) {
    return (
      <Loading />
    );
  } 
  if(error || !data.obtenerClientesPorVendedor) return window.location.href = 'login';

  return (
    <>
      <Layout>
        <h1 className="text-2xl text-gray-800">Clientes</h1>
        <Link href='/nuevocliente' >
          <p className="py-2 px-5 mt-5 underline hover:text-blue-600 text-blue-400 font-bold">Agregar Cliente</p>
        </Link>
        <table className="table-auto shadow-md mt-5 w-full w-lg">
          <thead className='bg-gray-800 text-white'>
            <tr>
              <th className='w-1/4 py-2'>Nombre</th>
              <th className='w-1/5 py-2'>Email</th>
              <th className='w-1/6 py-2'>Telefono</th>
              <th className='w-1/5 py-2'>Eliminar</th>
              <th className='w-1/5 py-2'>Editar</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.obtenerClientesPorVendedor.map(cliente=>(
              <Clientes key={cliente.id} cliente={cliente} />
            ))
          }
          </tbody>
        </table>
      </Layout>
    </>
  );
};

export default Index;
