import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";

const OBTENER_PEDIDOS = gql`
  query obtenerPedidosVendedor{
    obtenerPedidosVendedor {
      id    
    }
  }
`

const ACTUALIZAR_PEDIDO = gql`
  mutation actualizarPedido($id: ID!, $input: PedidoInput){
    actualizarPedido(id: $id, input: $input){
      estado
    }
  }
`

const ELIMINAR_PEDIDO = gql`
  mutation eliminarPedido($id: ID!){
    eliminarPedido(id: $id)
  }
`

const Pedido = ({ pedido }) => {
  const [actualizarPedido] = useMutation(ACTUALIZAR_PEDIDO)
  const [eliminarPedido] = useMutation(ELIMINAR_PEDIDO, {
    update(cache){
      const {obtenerPedidosVendedor} = cache.readQuery({
        query: OBTENER_PEDIDOS
      })

      cache.writeQuery({
        query: OBTENER_PEDIDOS,
        data:{
          obtenerPedidosVendedor: obtenerPedidosVendedor.filter(producto => producto.id !== id)
        }
      })
    }
  })

  const {
    id,
    cliente: { nombre, apellido, email, telefono },
    estado,
    cantidad,
    total,
    cliente
  } = pedido;

  const [estadoRender, setEstadoRender] = useState(estado)
  const [clase, setClase] = useState('')

  useEffect(()=>{
    if(estadoRender){
        setEstadoRender(estadoRender)
    }
    cambioClase()
  },[estadoRender])

  const cambioClase =()=>{
    if(estadoRender === 'PENDIENTE'){
        setClase('border-yellow-300')
    }else if(estadoRender === 'COMPLETADO'){
        setClase('border-green-500')
    }else{
        setClase('border-red-800')
    }
  }

  const cambiarEstadoPedido =async estado=>{
    try {
      const {data} = await actualizarPedido({
        variables:{
          id,
          input: {
            estado,
            cliente: cliente.id
          }
        }
      })
      setEstadoRender(data.actualizarPedido.estado)
    } catch (error) {
      console.log(error) 
    }
  }

  const btnEliminarPedido = async() =>{
    try {
      Swal.fire({
        title: 'Esta seguro que quiere eliminar el pedido?',
        text: "El pedido eliminado ya no se puede recuperar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText:'Cancelar'
      }).then(async(result) => {
        if (result.isConfirmed) {
          const {data} = await eliminarPedido({
            variables:{
              id
            }
          })
          Swal.fire(
            'Eliminado!',
            data.eliminarPedido,
            'success'
          )
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

 
  return (
    <div className={`${clase} border-t-4 mt-4 bg-gray-100 p-6 shadow-lg rounded md:grid md:grid-cols-2 md:gap-4`}>
      <div>
        <p className="font-bold text-gray-700">
          Cliente: {nombre} {apellido}
        </p>
        <p className="text-gray-700">
          Email: {email} 
        </p>
        <h2 className="font-bold text-gray-700 mt-10 mb-2">Estado Pedido:</h2>
        <select 
        className="hover:cursor-pointer appearance-none bg-blue-600 border border-blue-600 uppercase text-center text-white text-sm focus:outline-none focus:bg-blue-600 focus:border-blue-500 p-2 rounded leading-tight w-auto"
        value={estadoRender}
        onChange={e => cambiarEstadoPedido(e.target.value)}
        >
          <option value="COMPLETADO">COMPLETADO</option>
          <option value="PENDIENTE">PENDIENTE</option>
          <option value="CANCELADO">CANCELADO</option>
        </select>
      </div>
    

      <div>
        <h2 className="font-bold text-gray-700">Resumen del pedido</h2>
        {pedido.pedido.map(item=> {
            return (
                <div key={item.id} className="mt-4">
                    <p>Producto: {item.nombre}</p>
                    <p>Cantidad: {item.cantidad}</p>
                </div>
            )
        })}
         <h2 className="font-bold text-gray-700 mt-4">Total: ${total}</h2>
         <button onClick={()=> btnEliminarPedido()} className="mt-5 appearance-none bg-red-600 border border-red-600 hover:bg-red-800 hover:border-red-800 uppercase text-center text-white text-sm p-2 rounded leading-tight w-auto">Eliminar pedido</button>
      </div>
    </div>
  );
};

export default Pedido;
