import Layout from '@/components/Layout'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import Loading from '@/components/Loading'
import * as Yup from 'yup'
import Swal from 'sweetalert2'

const PRODUCTO_ID = gql`
    query obtenerProductoId($id: ID!){
        obtenerProductoId(id: $id){
            nombre
            stock
            precio
        }
    }
`
const EDITAR_PRODUCTO = gql`
mutation actualizarProducto($id: ID!, $input: ProductoInput){
        actualizarProducto(id: $id, input: $input) {
            nombre
            precio
            stock
        }
    }
`

const EditarProducto = () => {
    const router = useRouter()
    const {pid} = router.query
    const {data, loading, error} = useQuery(PRODUCTO_ID,{
        variables: {
            id: pid
        }
    }) 
    const [actualizarProducto] = useMutation(EDITAR_PRODUCTO)

    if(loading) return <Loading />
    

    const validacionSchema = Yup.object({
        nombre: Yup.string().required('El nombre es requerido'),
        stock: Yup.number().required('El stock es requerido'),
        precio: Yup.number().required('El precio es requediro')
    })

    const modificarInfoProducto =async valores=>{
        const {nombre, precio, stock} = valores
        try {
            const {data} = await actualizarProducto({
                variables: {
                    id: pid,
                    input: {
                        nombre, 
                        precio, 
                        stock
                    }
                }
            })
            Swal.fire("Actualizado", 'Producto actaulizado correctamente', "success");
            router.push('/productos')
        } catch (error) {
            console.log(error)
        }
       
    }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800">Editar Cliente</h1>
        {/* {mensaje && mostrarMensaje()} */}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg mt-5">
            <Formik
                validationSchema={validacionSchema}
                enableReinitialize
                initialValues={data.obtenerProductoId}
                onSubmit={valores=>{ modificarInfoProducto(valores)}}
            >
            {props =>{

           
           return(
            <form className='bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded' onSubmit={props.handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="nombre"
                >
                  Nombre
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  id="nombre"
                  type="text"
                  placeholder="Nombre producto"
                  value={props.values.nombre}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur} 
                />
              </div>
              {props.touched.nombre && props.errors.nombre ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{props.errors.nombre}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="stock"
                >
                  Stock
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  id="stock"
                  type="number"
                  placeholder="Stock producto"
                  value={props.values.stock}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
              </div>
              {props.touched.stock && props.errors.stock ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{props.errors.stock}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="precio"
                >
                  Precio
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  id="precio"
                  type="number"
                  placeholder="Precio producto"
                  value={props.values.precio}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
              </div>
              {props.touched.precio && props.errors.precio ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{props.errors.precio}</p>
                </div>
              ) : null}
              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 rounded-md hover:cursor-pointer"
                value="Editar cliente"
              />
            </form>
             )}}
            </Formik>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default EditarProducto
