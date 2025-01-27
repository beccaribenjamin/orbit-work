import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import {useUser} from '../context/UserContext.jsx'
import { Link } from 'react-router-dom'




export const NavBar = () => {
    const { logout } = useAuth()
    const { userData, loading } = useUser();

    if (loading) {
        return <p>Cargando datos del usuario...</p>; 
    }
    if(!userData){
        return <p>No se pudo rtraer</p>
    }
    const role = userData.role
    
    // Opciones de menu segun el rol
    const menuItems = {
        admin: [
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'Documentos', path: '/documents' },
            { name: 'Licencias', path: '/licencias' },
            { name: 'Workers', path: '/workers' },
        ],
        employee: [
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'Documentos', path: '/documents' },
            { name: 'Licencias', path: '/licencias' },
        ],
    };
    
    const currentMenu = menuItems[role] || [];


    return (
        <>
        <aside className='w-64 h-screen bg-gray-800 text-white flex flex-col'>
            <h2 className='text-2xl font-bold p-6 border-b border-gray-700'>Orbit Work</h2>
            <nav>
                <ul className='flex-1 p-4'>
                {currentMenu.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.path}
                                className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <button className='my-auto mx-3 py-2 bg-red-400 hover:bg-red-600 rounded-md text-white'
                onClick={logout}
            >
                Log Out
            </button>
            <div>
                <p>{userData.name}</p>
            </div>
        </aside>
        
        </>
    )
}
