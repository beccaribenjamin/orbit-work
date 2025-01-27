// uploads.js
import axios from "./axios";  // Asegúrate de tener tu instancia de axios configurada correctamente

export const gentUploadByUserRequest = async (userId) => {
    try {
        const response = await axios.get(`/upload/${userId}`); // Ajusta la URL si es necesario
        console.log(response)
        return response;
    } catch (error) {
        console.error("Error en la solicitud de documentos:", error);
        throw error;
    }
};
