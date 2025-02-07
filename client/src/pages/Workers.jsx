import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext"; // Asegúrate de que useUser esté correctamente configurado
import {NavBar} from "../components/NavBar";
import { EmployeeList } from "../components/EmployeeList";

export const Workers = () => {
    const { userData, loading } = useUser(); // Obtiene userData del contexto
    const [show, setShow] = useState(false);

    // Verifica si los datos están cargando o no disponibles
    if (loading) return <p>Cargando datos...</p>;
    if (!userData || !userData.company) return <p>Error: No se encontraron datos del usuario o la empresa.</p>;

    return (
        <div className="flex h-screen">
            <NavBar />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Trabajadores</h1>
                <button
                    className="h-10 px-4 rounded-md bg-green-500 text-white font-semibold"
                    onClick={() => setShow(!show)}
                >
                    {show ? "Ocultar Formulario" : "Nuevo Trabajador"}
                </button>
                {/* Pasamos los datos de la empresa para listar empleados */}
                <EmployeeList companyId={userData.company} show={show} setShow={setShow} />
            </div>
        </div>
    );
};

