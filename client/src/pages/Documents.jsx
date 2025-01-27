import React from 'react'
import { NavBar } from '../components/NavBar'



export const Documents = () => {
    return (
        <>
            <div className='flex h-screen' >
                <NavBar />
                <div className='flex-1 p-6 bg-gray-100'>
                    <h1>Documentos</h1>
                    <div>
                        <button className='bg-gray-800  text-white p-2  rounded-l-lg'>Mis Documentos</button>
                        <button className='bg-gray-800 mx-1 text-white p-2 '>Documentos Firmados</button>
                        <button className='bg-gray-800 text-white p-2 rounded-r-lg'>Subir Documentos</button>
                    </div>
                </div>
            </div>
        
        </>
    )
}
