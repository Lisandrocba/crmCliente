import React from 'react'
import Swal from 'sweetalert2'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

const ELIMINAR_PRODUCTO = gql`
mutation eliminarProducto($id: ID!){
  eliminarProducto(id: $id)
}
`
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

const Producto = ({producto}) => {
    const {nombre, stock, precio, id} = producto
    
    const router = useRouter()

    const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO,{
      update(cache){
        const {obtenerProductos} = cache.readQuery({
          query: OBTENER_PRODUCTOS
        })

        cache.writeQuery({
          query: OBTENER_PRODUCTOS,
          data:{
            obtenerProductos: obtenerProductos.filter(producto => producto.id !== id)
          }
        })
      }
    })

    const eliminarProductoBoton=()=>{
      Swal.fire({
        title: 'Esta seguro que quiere eliminar el producto?',
        text: "El producto eliminado ya no se puede recuperar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText:'Cancelar'
      }).then(async(result) => {
        if (result.isConfirmed) {
          const {data} = await eliminarProducto({
            variables: {
              id
            }
          })
          Swal.fire(
            'Eliminado!',
            data.eliminarProducto,
            'success'
          )
        }
      })
    }

    const EditarCliente =()=>{
      router.push({
        pathname: '/editarproducto/[id]',
        query: {id}
      })
    }

  return (
    <tr>
       <td className="border px-4 py-2">{nombre}</td>
       <td className="border px-4 py-2">{stock}</td>
       <td className="border px-4 py-2">{precio}</td>
       <td className="border px-4 py-2 ">
        <button
          className="w-full flex justify-center"
          onClick={()=>eliminarProductoBoton()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-red-500 hover:cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </td>

      <td className="border px-4 py-2 ">
        <button
          className="w-full flex justify-center"
          onClick={()=> EditarCliente()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-green-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      </td>
    </tr>
  )
}

export default Producto
