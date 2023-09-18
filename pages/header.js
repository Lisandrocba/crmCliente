import React from 'react'
import { gql, useQuery } from "@apollo/client";
import { useRouter } from 'next/router';

const QUERY_USUARIO = gql`
    query obtenerUsuario{
      obtenerUsuario {
        id
        nombre
        apellido
        
      }
    }
`

const Header = () => {
    const {data, loading} = useQuery(QUERY_USUARIO)
    const router = useRouter()
    if(loading) return null
    if(!data.obtenerUsuario){ return router.push('/login')}
    const {nombre} = data.obtenerUsuario
    
    const cerrarSesion=()=>{
        localStorage.removeItem('token')
        router.push('/login')
    }

  return (
    <div className='flex justify-between mb-10'>
      <p className='mr-2'>Bienvenido {nombre}</p>
     <button onClick={()=>cerrarSesion()} type='button' className='underline hover:text-red-400 text-blue-400'>Cerrar sesión</button>
    </div>
  )
}

export default Header
