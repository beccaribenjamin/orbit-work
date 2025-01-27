// src/routes/upload.routes.js

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');  // Middleware para cargar los archivos
const { getDocumentsByUserId } = require('../controllers/upload.controller');

// Ruta para manejar la subida de archivos
router.post('/', upload, (req, res) => {
    // Esta lógica es procesada en el middleware upload.js, por lo que no es necesario usar `upload.single` aquí
});

// Obtener documentos por userId
router.get('/:userId', getDocumentsByUserId);

module.exports = router;
