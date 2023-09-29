import React, {useReducer} from "react";
import PedidoContext from "./PedidosContext";
import PedidoReducer from './PedidosReducer'
import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    CALCULAR_CANTIDAD
} from '../../types'

const PedidosState =({children})=>{

    const initialState={
        cliente: {},
        productos:[],
        total: 0
    }

    const [state, dispatch] = useReducer(PedidoReducer, initialState)

    const agregarCliente =cliente=>{
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }

    const agregarProductos = productosSeleccionados =>{
        let nuevoState;
        if(state.productos.length > 0){
            nuevoState = productosSeleccionados.map(producto=>{
                const nuevoObjeto = state.productos.find(item=> item.id === producto.id )
                return{...producto, ...nuevoObjeto}
            })
        }else{
            nuevoState = productosSeleccionados
        }

        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: nuevoState
        })
    }

    const cantidadProducto = nuevoProducto =>{
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: nuevoProducto
        })
    }

    const calcularTotal = () =>{
        dispatch({
            type: CALCULAR_CANTIDAD
        })
    }

    return(
        <PedidoContext.Provider
        value={{
            productos: state.productos,
            total: state.total,
            cliente: state.cliente,
            agregarCliente,
            agregarProductos,
            cantidadProducto,
            calcularTotal
        }}
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidosState