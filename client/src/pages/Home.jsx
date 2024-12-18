import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export const Home = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header>
                <nav className='mx-auto mt-4 max-w-5xl flex items-center justify-between p-3 lg:px-8 bg-slate-200 rounded-md'>
                    <div className="flex">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span>Orbit Work</span>
                        </a>
                    </div>

                    {/* Menú de navegación */}
                    <div className='hidden lg:flex'>
                        <ul className='flex space-x-28'>
                            <li>
                                <Link to={'#'}>Producto</Link>
                            </li>
                            <li>
                                <Link to={'#'}>Beneficios</Link>
                            </li>
                            <li>
                                <Link to={'#'}>Precios</Link>
                            </li>
                            <li>
                                <Link to={'#'}></Link>
                            </li>
                        </ul>
                    </div>

                    {/* Botón de login */}
                    <div>
                        <button>
                            <Link to={'/login'}>Login</Link>
                        </button>
                    </div>

                    {/* Botón hamburguesa */}
                    <div className="lg:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Menú desplegable */}
                {isOpen && (
                    <div className="lg:hidden">
                        <ul className="space-y-4 py-4 px-2">
                            <li>
                                <Link to={'#'}>Producto</Link>
                            </li>
                            <li>
                                <Link to={'#'}>Beneficios</Link>
                            </li>
                            <li>
                                <Link to={'#'}>Precios</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </header>
        </>
    )
}
