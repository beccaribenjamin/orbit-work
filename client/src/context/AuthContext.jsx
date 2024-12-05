
import { createContext, useContext, useEffect, useState } from 'react'
import {loginRequest, verifyTokenRequest} from '../api/auth.js'
import Cookies from "js-cookie";


export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)
    if( !context ){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);


    // //Clear errors 
    // useEffect(()=> {
    //     if( errors.length > 0 ){
    //         const timer = setTimeout(() => {
    //             setErrors([]);
    //         }, 3000);
    //         return () => clearImmediate(timer)
    //     }
    // }, [errors]);

    {/*Luego crear la version de registro de usuario*/}
    const login = async(user) => {
        
        try {
            const res = await loginRequest(user)
            setUser(res.data);
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error);
        }

    }

    const logout = async() => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false)
    }

    //Revisa cookie, la compara y lo manda al dashboard o al login/register
    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) return setIsAuthenticated(false);
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setLoading(false);
            }
        };

        checkLogin();
        }, []);

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated,
            loading,
            errors,
        }}>
            {children}
        </AuthContext.Provider>
    )

}
