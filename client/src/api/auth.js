import axios from './axios'

// Obtén la URL del backend desde la variable de entorno
const API_URL = import.meta.env.VITE_BACKEND_URL;

// Crea una instancia de Axios con la URL base
const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

//Servio del login
export const loginRequest = async(user) => instance.post(`/auth/login`, user )
export const verifyTokenRequest = async() => instance.get('/auth/verify')

//Obtener User
export const getUserRequest = async(userId) => instance.get(`/users/${userId}`, userId)