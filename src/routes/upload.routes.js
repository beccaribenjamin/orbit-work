// src/routes/upload.routes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');  // Middleware para cargar los archivos
const { getDocumentsByUserId } = require('../controllers/upload.controller');



// Ruta para manejar la subida de archivos
router.post('/', upload.single('file'), (req, res) => {
    // Aquí se maneja la respuesta después de subir el archivo
    res.json({
        message: 'Archivo subido exitosamente',
        file: req.file,  // Asegúrate de que req.file esté correctamente definido
    });
});

// Obtener documentos por userId
router.get('/:userId', getDocumentsByUserId);

module.exports = router;
