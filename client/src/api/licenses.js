import axios from './axios'

export const getLicensesByCompanyRequest = async(companyId) => axios.get(`/licenses/company/${companyId}`);

export const getLicensesByUserRequest = async(userId) => axios.get(`/licenses/user/${userId}`);

export const updateLicensesRequest = async(licensesId, updateData) => axios.put(`/licenses/${licensesId}`, updateData)

export const createLicensesRequest = async(licenseData) => axios.post('/licenses', licenseData)