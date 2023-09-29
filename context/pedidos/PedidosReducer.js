import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    CALCULAR_CANTIDAD
} from '../../types'

export default (state, action) =>{
    switch (action.type) {
        case SELECCIONAR_CLIENTE:
            return {
                ...state, cliente: action.payload
            }

        case SELECCIONAR_PRODUCTO:{
            return{
                ...state, productos: action.payload
            }
        }

        case CANTIDAD_PRODUCTOS:{
            return{
                ...state, 
                productos: state.productos.map(item => item.id === action.payload.id ? item = action.payload : item)
            }
        }

        case CALCULAR_CANTIDAD:{
            return{
                ...state,
                total: state.productos.reduce((acumulado, producto)=> acumulado += producto.precio * producto.cantidad, 0)
            }
        }
    
        default:
            return state
    }
}