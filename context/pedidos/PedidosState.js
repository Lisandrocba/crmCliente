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
        cliente = {},
        pedidos={},
        total= 0
    }

    const [state, dispatch] = useReducer(PedidoReducer, initialState)

    return(
        <PedidoContext.Provider
        value={{

        }}
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidosState