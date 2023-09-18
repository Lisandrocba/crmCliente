import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Sidebar = () => {
    const router = useRouter()

  return (
    <aside className='bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
        <div>
            <p className='text-white text-xl font-black'>CRM Clientes</p>
        </div>
        <nav className='mt-5 list-none'>
            <li className={router.pathname === '/' ? "border-l-2 border-l-cyan-600 p-2" : "border-l-2 border-l-transparent p-2"}>
                <Link href='/' legacyBehavior>
                    <a className='text-white block'>
                        Clientes
                    </a>
                </Link>
            </li>
            <li className={router.pathname === '/pedidos' ? "border-l-2 border-l-cyan-600  p-2" : "border-l-2 border-l-transparent p-2"}>
                <Link href='/pedidos' legacyBehavior>
                <a className='text-white block'>
                        Pedidos
                    </a>
                </Link>
            </li>
            <li className={router.pathname === '/productos' ? "border-l-2 border-l-cyan-600  p-2" : "border-l-2 border-l-transparent p-2"}>
                <Link href='/productos' legacyBehavior>
                <a className='text-white block'>
                        Productos
                    </a>
                </Link>
            </li>
        </nav>
    </aside>
  )
}

export default Sidebar
