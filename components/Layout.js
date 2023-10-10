import Head from "next/head";
import React from "react";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import Header from "@/pages/header";


const Layout = ({ children }) => {

  const router = useRouter()
  return (
    <div>
        <Head>
            <title>CRM - Administracion de clientes</title>
        </Head>
        {
            router.pathname === '/login' || router.pathname === '/nuevacuenta' ?
            (
                <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
                    <div>
                        {children}
                    </div>
                </div>
                
            )
            :
            (
            <div className="sm:flex min-h-screen gb-gray-200">
            <Sidebar />
            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
              <Header />
              {children}
            </main>
            </div>
          )
        }
        </div>
    
  );
};

export default Layout;
