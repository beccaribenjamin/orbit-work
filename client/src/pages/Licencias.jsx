import React, { useEffect, useState } from 'react'
import { NavBar } from '../components/NavBar'
import { useUser } from '../context/UserContext'





export const Licencias = () => {

    const { getLicensesByCompany, getLicensesByUser, updateLicenses, licenses, userData } = useUser();
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('pendiente');

    const fetchLicenses = async () => {

        if (!userData) {
            return <p>Cargando datos del usuario...</p>;
        }

        setLoading(true);
        try {
            if (userData.role === 'admin') {
                await getLicensesByCompany(userData.company)
            } else {
                await getLicensesByUser(userData._id)
            }
        } catch (error) {
            console.error('Error al obtener las licencias', error)
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (userData) {
            fetchLicenses();
        }
    }, [userData]);

    const filterLicenses = Array.isArray(licenses) ? licenses.filter((license) => license.status === filter) : [];


    return (
        <div className="flex h-screen">
            <NavBar />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Licencias</h1>
                {/* Menú de opciones */}
                <div className="mb-4">
                    <button
                        className={`px-4 py-2 mr-2 rounded ${filter === 'Pendiente' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                        onClick={() => setFilter('Pendiente')}
                    >
                        Pendientes
                    </button>
                    <button
                        className={`px-4 py-2 mr-2 rounded ${filter === 'Aprobada' ? 'bg-green-500 text-white' : 'bg-gray-300'
                            }`}
                        onClick={() => setFilter('Aprobada')}
                    >
                        Aprobadas
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${filter === 'Rechazada' ? 'bg-red-500 text-white' : 'bg-gray-300'
                            }`}
                        onClick={() => setFilter('Rechazada')}
                    >
                        Rechazadas
                    </button>
                </div>
                {/* Licencias filtradas */}
                {loading ? (
                    <p>Cargando licencias...</p>
                ) : filterLicenses.length > 0 ? (
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {filterLicenses.map((license) => (
                            <div key={license._id} className="p-4 bg-white rounded shadow">
                                <h3 className="font-bold">{license.type}</h3>
                                <p>Inicio: {new Date(license.startDate).toLocaleDateString()}</p>
                                <p>Fin: {new Date(license.endDate).toLocaleDateString()}</p>
                                <p>Estado: {license.status}</p>
                                <p>Estado: {license.user}</p>
                                {/* Mostrar los botones solo si esta en pendiente */}
                                {license.status === 'Pendiente' && (
                                    <div className="flex space-x-2 mt-2">
                                        <button
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                            onClick={() => updateLicenses(license._id, 'aprobada')}
                                        >
                                            Aprobar
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                            onClick={() => updateLicenses(license._id, 'rechazada')}
                                        >
                                            Rechazar
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No se encontraron licencias en este estado.</p>
                )}
            </div>
        </div>
    );
};