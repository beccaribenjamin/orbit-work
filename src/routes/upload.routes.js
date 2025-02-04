// src/routes/upload.routes.js

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');  // Middleware para cargar los archivos
const { getDocumentsByUserId, signPDF} = require('../controllers/upload.controller');
const { default: mongoose } = require('mongoose');

// Ruta para manejar la subida de archivos
router.post('/', upload, (req, res) => {
    // Esta lógica es procesada en el middleware upload.js, por lo que no es necesario usar `upload.single` aquí
});

// Ruta para firmar el PDF
router.post('/sign', signPDF); 

// Obtener documentos por userId
router.get('/:userId', getDocumentsByUserId);

router.get('/download/:fileId', async (req, res) => {
    try {
        const fileId = req.params.fileId;

        // Verifica si el fileId es válido
        if (!mongoose.Types.ObjectId.isValid(fileId)) {
            return res.status(400).json({ message: "ID de archivo no válido" });
        }

        // Buscar el archivo en GridFS
        const file = await mongoose.connection.db
            .collection("uploads.files")
            .findOne({ "_id": new mongoose.Types.ObjectId(fileId) });

        if (!file) {
            return res.status(404).json({ message: "Archivo no encontrado" });
        }

        // Crear un stream para descargar el archivo desde GridFS
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: "uploads" });
        const downloadStream = bucket.openDownloadStream(file._id);

        // Establecer los headers para la descarga
        res.setHeader('Content-Disposition', `attachment; filename=${file.filename}`);
        res.setHeader('Content-Type', file.contentType);

        // Pipiar el stream para enviar el archivo al cliente
        downloadStream.pipe(res);

        downloadStream.on('error', (err) => {
            console.error("Error al descargar el archivo:", err);
            res.status(500).json({ message: "Error al descargar el archivo", error: err.message });
        });
    } catch (error) {
        console.error("Error en la ruta de descarga:", error);
        res.status(500).json({ message: "Error al procesar la descarga", error: error.message });
    }
});





module.exports = router;
