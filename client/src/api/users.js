import axios from './axios'

export const getEmployeesRequest = async(companyId) => axios.get(`/users/company/${companyId}`)

export const createEmployeeRequest = async(user) => axios.post(`/users/register`, user);

export const deleteUserRequest = async(userId) => axios.delete(`/users/${userId}`);

export const editUserRequest = async(userId, userData) => axios.put(`/users/${userId}`, userData);