import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <>
            <header className=''>
                <nav className='mx-auto mt-4 flex max-w-7xl items-center justify-between p-3 lg:px-8 bg-slate-200 rounded-md'>
                    <div class="flex">
                        <a href="#" class="-m-1.5 p-1.5">
                            <span class="">Orbit Work</span>
                            {/* <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt=""/> */}
                        </a>
                    </div>
                    <div className='flex'>
                        <ul className='flex space-x-6'>
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
                    <div>
                        <button>
                            <Link to={'/login'}>Login</Link>
                        </button>
                    </div>
                </nav>
            </header>
        </>
    )
}
