import { useState, useEffect } from 'react'
import { getEmployeesRequest } from '../api/users'

import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { RegisterEmployee } from './RegisterEmployee';


export const EmployeeList = ({ companyId, show, setShow }) => {
    const { user: authUser } = useAuth();
    const { deleteUser, updateTrigger } = useUser();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                const { data } = await getEmployeesRequest(companyId);
                setEmployees(data);
            } catch (err) {
                console.error("Error al obtener empleados:", err.message || err.response?.data?.msg);
                setEmployees([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [updateTrigger]);

    const handleEditClick = (user) => {
        setEditingUser(user); // Selecciona el usuario
        setShow(true); // Muestra el formulario
    };

    const handleCloseForm = () => {
        setEditingUser(null); // Limpia el usuario en edición
        setShow(false); // Oculta el formulario
    };

    if (loading) return <p>Cargando empleados...</p>;

    return (
        <div className="p-4">
            {employees.length === 0 ? (
                <p>No hay empleados registrados.</p>
            ) : (
                <ul className="space-y-2 max-h-[700px] overflow-y-auto border border-gray-300 rounded-md shadow-sm">
                    {employees.map((employee) => (
                        <li key={employee._id} className="p-2 bg-gray-100 rounded-md shadow-md">
                            <p><strong>Nombre:</strong> {employee.name}</p>
                            <p><strong>Nombre:</strong> {employee._id}</p>
                            <p><strong>Email:</strong> {employee.email}</p>
                            <p><strong>Puesto:</strong> {employee.position}</p>
                            <p><strong>Area / Departamento:</strong> {employee.area}</p>
                            <p><strong>Role:</strong> {employee.role}</p>
                            <div className='space-x-3 py-3'>
                                <button
                                    className="p-2 bg-yellow-400 hover:bg-yellow-200 rounded-md text-white"
                                    onClick={() => handleEditClick(employee)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="p-2 bg-red-400 hover:bg-red-600 rounded-md text-white"
                                    onClick={() => deleteUser(employee._id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {show && (
                <RegisterEmployee
                    initialValues={editingUser}
                    setShow={handleCloseForm}
                />
            )}
        </div>
    );
};
