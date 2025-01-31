import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useForm } from 'react-hook-form'; // Importamos React Hook Form
import { NavBar } from '../components/NavBar';
import { getEmployeesRequest } from '../api/users';
import { postUpload } from '../api/uploads';

export const Documents = () => {
    const { documents, loading, getDocumentsByUser, userData } = useUser();
    const [employees, setEmployees] = useState([]); // Para almacenar los empleados
    const [show, setShow] = useState(false); // Para mostrar el formulario
    const [file, setFile] = useState(null); // Para almacenar el archivo seleccionado

    const { register, handleSubmit, formState: { errors }, setValue } = useForm(); // Usamos react-hook-form

    useEffect(() => {
        // Obtener los documentos para el usuario logueado
        if (userData?.id) {
            getDocumentsByUser(userData.id);
            console.log(userData.company); // Debugging
        }
    }, [userData, getDocumentsByUser]);

    if (loading) {
        return <div>Cargando documentos...</div>;
    }

    // Obtener empleados al cambiar el companyId
    useEffect(() => {
        const fetchEmployees = async () => {
            if (!userData?.company) return; // Verifica si companyId está disponible
            try {
                const response = await getEmployeesRequest(userData.company);
                if (response.data) {
                    setEmployees(response.data); // Guarda los empleados obtenidos
                }
            } catch (error) {
                console.error('Error al obtener empleados:', error);
            }
        };

        fetchEmployees();
    }, [userData?.company]); // Ejecuta este efecto cada vez que el companyId cambie

    // Manejador para el cambio del archivo
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile); // Almacena el archivo en el estado
        }
    };

    // Función que se ejecuta cuando se envía el formulario
    const onSubmit = async (data) => {
        if (!file) {
            alert('Por favor selecciona un archivo.');
            return;
        }

        try {
            // Llamamos a la API para subir el archivo
            const response = await postUpload(data.employeeId, file);
            console.log('Respuesta del servidor:', response);
            alert('Archivo subido exitosamente!');
            setShow(false); // Cierra el formulario
        } catch (error) {
            console.error('Error al subir el archivo:', error);
            alert('Hubo un problema al subir el archivo.');
        }
    };

    const showForm = () => {
        setShow(!show);
    };

    return (
        <div className="flex h-screen">
            <NavBar />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Documentos</h1>
                <div>
                    <button className="bg-gray-800 text-white p-2 rounded-l-lg">Mis Documentos</button>
                    <button className="bg-gray-800 mx-1 text-white p-2">Documentos Firmados</button>
                    <button onClick={showForm} className="bg-gray-800 text-white p-2 rounded-r-lg">
                        Subir Documentos
                    </button>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Documentos Asignados</h2>
                    <ul className="mt-4">
                        {documents.length > 0 ? (
                            documents.map((doc) => (
                                <li key={doc._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                                    <h3 className="text-lg font-bold">{doc.filename}</h3>
                                    <p>{new Date(doc.uploadDate).toLocaleDateString()}</p>
                                    <p>Tipo: {doc.contentType}</p>
                                    <a
                                        href={`/uploads/${doc._id}`}
                                        className="text-blue-500 hover:underline mt-2 block"
                                        download={doc.filename} // Esto asegura que el archivo se descargue con su nombre original
                                    >
                                        Descargar
                                    </a>
                                </li>
                            ))
                        ) : (
                            <li>No tienes documentos asignados.</li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Mostrar el formulario solo si "show" es verdadero */}
            {show && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                    <div className="max-w-md w-full p-10 rounded-2xl bg-gray-800">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                            <label className="text-white">Empleado</label>
                            {/* Dropdown de empleados */}
                            <select
                                {...register("employeeId", { required: "El empleado es obligatorio" })}
                                className="p-2 rounded-md"
                            >
                                <option value="">Seleccione un empleado</option>
                                {employees.length > 0 ? (
                                    employees.map((employee) => (
                                        <option key={employee._id} value={employee._id}>
                                            {employee.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No hay empleados disponibles</option>
                                )}
                            </select>
                            {errors.employeeId && <p className="text-red-500">{errors.employeeId.message}</p>}

                            {/* Contenedor personalizado para archivo */}
                            <div
                                className="border-2 border-dashed border-gray-400 p-4 rounded-md text-white text-center cursor-pointer"
                                onClick={() => document.getElementById('fileInput').click()}
                            >
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <p>Arrastra tu archivo aquí o haz clic para seleccionar</p>
                            </div>

                            {/* Mostrar el nombre del archivo si se ha seleccionado */}
                            {file && (
                                <div className="text-white mt-2">
                                    <p><strong>Archivo seleccionado:</strong> {file.name}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="bg-green-500 text-white py-2 px-4 rounded-md"
                            >
                                Subir Documento
                            </button>
                            <button
                                type="button"
                                onClick={() => setShow(!show)}
                                className="bg-red-500 text-white py-2 px-4 rounded-md"
                            >
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
