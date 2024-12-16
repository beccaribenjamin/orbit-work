import React, { useState, useEffect } from 'react'
import { useUser } from "../context/UserContext"; // Asegúrate de que useUser esté correctamente configurado
import { getEmployeesRequest } from '../api/users';
import { NavBar } from '../components/NavBar'

export const Dashboard = () => {

    const { userData } = useUser();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true)


    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const { data } = await getEmployeesRequest(userData.company);
            setEmployees(data);
        } catch (err) {
            console.error("Error al obtener empleados:", err.message || err.response?.data?.msg);
            setEmployees([]);
        } finally {
            setLoading(false);
        }
    };
    

    const currentMonth = new Date().getMonth();

    const filterEmployees = employees.filter((employee) => {
        const date = new Date(employee.createdAt);
        
        return date.getMonth() === currentMonth && !isNaN(date.getTime());
    });

    useEffect(() => {
        if (userData) {
            fetchEmployees()
        }
    }, [userData]);


    return (
        <>
            <div className='flex h-screen'>
                <NavBar />
                <div className="flex-1 p-6 bg-gray-100">
                    {/* <h1 className='text-2xl font-bold mf-4'>Dashboard</h1> */}
                    <section className='h-3/5  bg-gray-800 rounded-md'>
                        <h3 className='p-3 text-xl text-white'>Notificaciones</h3>
                    </section>
                    <div className='flex h-2/5'>
                        <section className='w-2/4 my-4 mr-2 bg-gray-800 rounded-md'>
                            <h3 className='p-3 text-xl text-white'>Licencias Pendientes</h3>
                        </section>
                        <section className='w-2/4 my-4 bg-gray-800 rounded-md overflow-y-auto'>
                            <h3 className='p-3 text-xl text-white'>Nuevos Ingresos</h3>
                            {filterEmployees.map((employee) => (
                                <div key={employee._id} className='m-2 px-3 py-4 flex border border-slate-500 text-white rounded-md '>
                                    <h4 className='basis-1/2'>{employee.name}</h4>
                                    <p className='basis-1/2'>{employee.position}</p>
                                    
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
