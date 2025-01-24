const mongoose = require('mongoose');

// Obtener documentos por userId
const getDocumentsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        // Buscar documentos en la colección de GridFS según el userId en los metadatos
        const documents = await mongoose.connection.db
            .collection('uploads.files')
            .find({ 'metadata.userId': userId })
            .toArray();

        if (!documents.length) {
            return res.status(404).json({
                message: `No se encontraron documentos para el userId: ${userId}`,
            });
        }

        res.status(200).json({
            message: 'Documentos encontrados:',
            documents,
        });
    } catch (error) {
        console.error('Error al obtener documentos:', error);
        res.status(500).json({
            message: 'Ocurrió un error al obtener los documentos',
            error: error.message,
        });
    }
};

module.exports = {
    getDocumentsByUserId,
};
