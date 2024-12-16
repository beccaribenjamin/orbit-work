import { createContext, useContext, useEffect, useState } from "react";
import { getUserRequest } from '../api/auth.js'
import { createEmployeeRequest, deleteUserRequest, editUserRequest } from '../api/users.js'
import { useAuth } from "./AuthContext";
import { createLicensesRequest, getLicensesByCompanyRequest, getLicensesByUserRequest, updateLicensesRequest } from "../api/licenses.js";



export const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser debe ser utilizado en UseProvider')
    }
    return context;
}

export const UserProvider = ({ children }) => {

    const { user: authUser } = useAuth()

    const [userData, setUserData] = useState(null);
    const [licenses, setLicenses] = useState([]);
    const [loading, setLoading] = useState(true);
    //Prueba de update triger
    const [updateTrigger, setUpdateTrigger] = useState(false);


    const registerUser = async (user) => {

        try {
            // Agregar el ID de la empresa al objeto user
            const userWithCompany = {
                ...user,
                company: userData.company, // Obteniendo el ID de la empresa desde el contexto de autenticación
            };

            // Realizar la solicitud al backend
            const res = await createEmployeeRequest(userWithCompany);
            setUpdateTrigger(prev => !prev);
        } catch (error) {
            console.error("Error al crear usuario:", error.response?.data || error.message);
        }

    }


    const getUser = async (userId) => {
        try {
            const res = await getUserRequest(userId)
            setUserData(res.data)

        } catch (error) {
            console.log('Erro al obtener los datos del usuario')
        }
    }


    const deleteUser = async (userId) => {

        try {
            await deleteUserRequest(userId);
            setUpdateTrigger(prev => !prev);
        } catch (error) {
            console.log(error)
        }

    }

    const editUser = async (userId, userData) => {
        try {
            await editUserRequest(userId, userData);
            setUpdateTrigger(prev => !prev);
        } catch (error) {
            console.error(error);
        }

    }

    /************************************** Nuevas Funciones de Licencias **************************************/

    const createLicense = async(licenseData) => {
        
        try {
            const {data} = await createLicensesRequest(licenseData);
            setLicenses(data)
        } catch (error) {
            console.error('Error al crear licencia:', error);
            throw error; // Puedes propagar el error para manejarlo en el frontend
        }

    }

    const getLicensesByCompany = async (companyId) => {

        try {
            const { data } = await getLicensesByCompanyRequest(companyId);
            if (data.length === 0) {
                console.log("No hay licencias para esta empresa");
                setLicenses([]); // Resetea el estado de licencias
                return;
            }
            setLicenses(data); // Actualiza con las licencias obtenidas
        } catch (error) {
            console.error('Error al obtener las licencias por compañía', error);
            setLicenses([]); // Opcional: resetea las licencias si ocurre un error
        }

    }

    const getLicensesByUser = async (userId) => {

        try {
            const { data } = await getLicensesByUserRequest(userId);
            setLicenses(data.length ? data : []); // Asegura que siempre sea un arreglo
        } catch (error) {
            console.error('Error al obtener las licencias por usuario', error);
            setLicenses([]); // Resetea a un arreglo vacío en caso de error
        }

    }


    const updateLicenses = async (licenseId, status) => {

        try {
            await updateLicensesRequest(licenseId, { status });
            alert(`Licencia ${status === 'Aprobada' ? 'Aprobada' : 'Rechazada'} correctamente`);
        } catch (error) {
            console.error('Error al actualizar la licencia:', error);
            alert('Error al actualizar la licencia');
        }

    }


    useEffect(() => {
        if (authUser?.id) {
            setLoading(true)
            getUser(authUser.id); // Obtienes los datos completos del usuario

        } else {
            setLoading(false)
        }
    }, [authUser]);



    return (
        <UserContext.Provider value={{
            userData,
            getUser,
            registerUser,
            deleteUser,
            editUser,
            licenses,
            createLicense,
            getLicensesByCompany,
            getLicensesByUser,
            updateLicenses,
            updateTrigger,
        }}>
            {children}
        </UserContext.Provider>
    )

}