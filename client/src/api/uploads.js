// uploads.js
import axios from "./axios";  // Asegúrate de tener tu instancia de axios configurada correctamente

export const gentUploadByUserRequest = async (userId) => {
    try {
        const response = await axios.get(`/upload/${userId}`); // Ajusta la URL si es necesario
        return response;
    } catch (error) {
        console.error("Error en la solicitud de documentos:", error);
        throw error;
    }
};

export const postUpload = async (userId, file) => {
    try {
        // Creamos un nuevo FormData
        const formData = new FormData();

        // Añadimos el archivo y el userId al FormData
        formData.append('file', file);
        formData.append('userId', userId);

        // Hacemos la solicitud POST a la ruta /upload
        const response = await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Necesario para enviar archivos
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        throw error;
    }
};