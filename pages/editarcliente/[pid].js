import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import Loading from '@/components/Loading'
import { Formik } from 'formik'
import * as Yup from 'yup';
import Swal from 'sweetalert2'

const OBTENER_CLIENTE = gql`
    query obtenerCliente($id: ID!){
        obtenerCliente(id: $id) {
            nombre
            apellido
            email
            telefono
        }
    }
`

const MODIFICAR_CLIENTE = gql`
mutation actualizarCliente($id: ID!, $input: ClienteInput){
    actualizarCliente(id: $id, input: $input){
      nombre
      apellido
      id
      email
    }
  }
`

const EditarCliente = () => {
    const router = useRouter()
    const {pid} = router.query
    const {data, loading, error} = useQuery(OBTENER_CLIENTE,{
        variables: {
            id: pid
        }
    })
    const [actualizarCliente] = useMutation(MODIFICAR_CLIENTE)
    const validacionSchema = Yup.object({
        nombre: Yup.string().required('El campo Nombre es obligatorio'),
        apellido: Yup.string().required('El campo Apellido es obligatorio'),
        email: Yup.string().email('Email invalido').required('El campo Email es obligatorio'),
    })

    if(loading) return <Loading />
    
    const modificarInfoCliente = async valores =>{
        const {nombre, apellido, email, telefono} = valores
        try {
            const {data} = await actualizarCliente({
                variables:{
                    id: pid,
                    input: {
                        nombre, 
                        apellido, 
                        email, 
                        telefono
                    }
                }
            })
            Swal.fire("Actualizado", 'Cliente actaulizado correctamente', "success");
            router.push('/')
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
                initialValues={data.obtenerCliente}
                onSubmit={valores=>{ modificarInfoCliente(valores)}}
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
                  placeholder="Nombre cliente"
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
                  htmlFor="apellido"
                >
                  Apellido
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  id="apellido"
                  type="text"
                  placeholder="Apellido cliente"
                  value={props.values.apellido}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
              </div>
              {props.touched.apellido && props.errors.apellido ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{props.errors.apellido}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  id="email"
                  type="email"
                  placeholder="Email cliente"
                  value={props.values.email}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
              </div>
              {props.touched.email && props.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{props.errors.email}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="telefono"
                >
                  Telefono
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  id="telefono"
                  type="tel"
                  placeholder="Telefono cliente"
                  value={props.values.telefono}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
              </div>
              {props.touched.telefono && props.errors.telefono ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{props.errors.telefono}</p>
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

export default EditarCliente
