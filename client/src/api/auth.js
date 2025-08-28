
import axios from './axios'


//Servio del login
export const loginRequest = async(user) => axios.post(`/auth/login`, user )
export const verifyTokenRequest = async() => axios.get('/auth/verify')

//Obtener User
export const getUserRequest = async(userId) => axios.get(`/users/${userId}`, userId)