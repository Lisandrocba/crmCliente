import Layout from '@/components/Layout'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

const CREAR_PRODUCTO = gql`
    mutation crearProducto($input: ProductoInput){
            crearProducto(input : $input){
            nombre
        }
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

const nuevoproducto = () => {
    const [crearProducto] = useMutation(CREAR_PRODUCTO,{
        update(cache, {data: crearProducto}){
            const {obtenerProductos} = cache.readQuery({query: OBTENER_PRODUCTOS})

            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: [...obtenerProductos, crearProducto]
                }
            })
        }
    })
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            nombre: '',
            stock: 0,
            precio: 0,
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El campo nombre es obligatorio'),
            stock: Yup.number().required('El campo stock es obligatorio'),
            precio: Yup.number().required('El campo precio es obligatorio')
        }),
        onSubmit: async valores=>{
            const {nombre, stock, precio} = valores
            try {
                const {data} = await crearProducto({
                    variables:{
                        input:{
                            nombre, 
                            stock,
                            precio
                        }
                    }
                })
                router.push('/productos')
            } catch (error) {
                console.log(error)
            }
           
        }
    })
  return (
    <div>
        <Layout>
            <h1 className="text-2xl text-gray-800">Nuevo producto</h1>
        {/*     {mensaje && mostrarMensaje()} */}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg mt-5">
            <form className='bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded' onSubmit={formik.handleSubmit}>
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
                  placeholder="Nombre cliente"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.nombre && formik.errors.nombre ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.nombre}</p>
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
                  value={formik.values.stock}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.stock && formik.errors.stock ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.stock}</p>
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
                  value={formik.values.precio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.precio && formik.errors.precio ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.precio}</p>
                </div>
              ) : null}

              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 rounded-md hover:cursor-pointer"
                value="Agregar cliente"
              />
            </form>
          </div>
        </div>
        </Layout>
    </div>
  )
}

export default nuevoproducto
