import React from 'react'
import { NavBar } from '../components/NavBar'

export const Dashboard = () => {

    return (
        <>
            <div className='flex h-screen'>
            <NavBar/>
            <div className="flex-1 p-6 bg-gray-100">
                    <h1 className='text-2xl font-bold mf-4'>Dashboard</h1>
                    <section className='h-2/5  bg-slate-400 rounded-md'>
                        <h3 className='p-3 text-xl text-white'>Pendientes</h3>
                    </section>
            </div>
            </div>
        </>
    )
}
