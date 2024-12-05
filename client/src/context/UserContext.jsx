import { createContext, useContext, useEffect, useState } from "react";
import {getUserRequest} from '../api/auth.js'
import { createEmployeeRequest, deleteUserRequest, editUserRequest} from '../api/users.js'
import { useAuth } from "./AuthContext";



export const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context){
        throw new Error('useUser debe ser utilizado en UseProvider')
    }
    return context;
}

export const UserProvider = ({children}) => {

    const {user : authUser} = useAuth()
    
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    //Prueba de update triger
    const [updateTrigger, setUpdateTrigger] = useState(false);


    const registerUser = async( user ) => {

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


    const getUser = async(userId) => {
        try {
            const res = await getUserRequest(userId)
            setUserData(res.data)
            
        } catch (error) {
            console.log('Erro al obtener los datos del usuario')
        }
    }


    const deleteUser = async(userId) => {

        try {
            await deleteUserRequest(userId);
            setUpdateTrigger(prev => !prev);
        } catch (error) {
            console.log(error)
        }

    }

    const editUser = async(userId, userData) => {
        try {
            await editUserRequest(userId, userData);
            setUpdateTrigger(prev => !prev);
        } catch (error) {
            console.error(error);
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
    
    

    return(
        <UserContext.Provider value={{
            userData,
            getUser,
            registerUser,
            deleteUser,
            editUser,
            updateTrigger,
        }}>
            {children}
        </UserContext.Provider>
    )

}