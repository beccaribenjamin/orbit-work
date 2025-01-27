// Documents.jsx
import React, { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { NavBar } from '../components/NavBar';

export const Documents = () => {
    const { documents, loading, getDocumentsByUser, userData } = useUser();

    useEffect(() => {
        // Obtener los documentos para el usuario logueado
        if (userData?.id) {
            getDocumentsByUser(userData.id);
        }
    }, [userData, getDocumentsByUser]);

    if (loading) {
        return <div>Cargando documentos...</div>;
    }

    return (
        <div className="flex h-screen">
            <NavBar />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Documentos</h1>
                <div>
                    <button className="bg-gray-800 text-white p-2 rounded-l-lg">Mis Documentos</button>
                    <button className="bg-gray-800 mx-1 text-white p-2">Documentos Firmados</button>
                    <button className="bg-gray-800 text-white p-2 rounded-r-lg">Subir Documentos</button>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Documentos Asignados</h2>
                    <ul className="mt-4">
                        {documents.length > 0 ? (
                            documents.map((doc) => (
                                <li key={doc._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                                    <h3 className="text-lg font-bold">{doc.filename}</h3> {/* Muestra el nombre del archivo */}
                                    <p>{new Date(doc.uploadDate).toLocaleDateString()}</p> {/* Formatear fecha */}
                                    <p>Tipo: {doc.contentType}</p>

                                    {/* Enlace de descarga */}
                                    <a 
                                        href={`/uploads/${doc._id}`} 
                                        className="text-blue-500 hover:underline mt-2 block"
                                        download={doc.filename} // Esto asegura que el archivo se descargue con su nombre original
                                    >
                                        Descargar PDF
                                    </a>
                                </li>
                            ))
                        ) : (
                            <li>No tienes documentos asignados.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};
