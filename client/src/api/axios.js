import axios from 'axios'

// Usa la variable de entorno que se configura en Vercel
const baseURL = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true, // Permitir cookies
})

export default instance