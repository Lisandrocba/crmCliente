import React, {useReducer} from "react";
import PedidoContext from "./PedidosContext";
import PedidoReducer from './PedidosReducer'
import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS
} from '../../types'

const PedidosState =({children})=>{

    const initialState={
        cliente : {},
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

    const agregarProductos = productos =>{
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: productos
        })
    }

    return(
        <PedidoContext.Provider
        value={{
            agregarCliente,
            agregarProductos
        }}
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidosState