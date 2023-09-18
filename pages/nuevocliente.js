import Layout from "@/components/Layout";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const MUTATION_AGREGAR_CLIENTE = gql`
mutation crearCliente($input: ClienteInput){
    crearCliente(input: $input){
      id
      nombre
      apellido
      email
      telefono
    }
  }
`

const nuevocliente = () => {

    const [crearCliente] = useMutation(MUTATION_AGREGAR_CLIENTE)
    const router = useRouter()
    const [mensaje, setMensaje] = useState(null);

    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            telefono: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El campo Nombre es obligatorio'),
            apellido: Yup.string().required('El campo Apellido es obligatorio'),
            email: Yup.string().email('Email invalido').required('El campo Email es obligatorio'),
        }),
        onSubmit: async valores =>{
            const {nombre, apellido, email, telefono} = valores
            try {
                const {data} = await crearCliente({
                    variables: {
                        input: {
                            nombre,
                            apellido,
                            email,
                            telefono
                        }
                    }
                })
                router.push('/')
            } catch (error) {
                setMensaje(error.message.replace("ApolloError: ", ""));
                    setTimeout(() => {
                    setMensaje(null);
                    }, 3000);
            }
        }
    })

    const mostrarMensaje = () => {
        return (
          <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto rounded">
            <p>{mensaje}</p>
          </div>
        );
      };

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800">Nuevo cliente</h1>
        {mensaje && mostrarMensaje()}
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
                  htmlFor="apellido"
                >
                  Apellido
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  id="apellido"
                  type="text"
                  placeholder="Apellido cliente"
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.apellido && formik.errors.apellido ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.apellido}</p>
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
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.email}</p>
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
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.telefono && formik.errors.telefono ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.telefono}</p>
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
  );
};

export default nuevocliente;
