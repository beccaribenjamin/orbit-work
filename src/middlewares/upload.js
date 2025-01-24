// src/middlewares/upload.js

const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const crypto = require('crypto');
const path = require('path');

// Conexión a MongoDB
const mongoURI = process.env.MONGODB_CNN;
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

conn.once('open', () => {
    console.log('Conectado a MongoDB');
});

// Configuración de GridFS para almacenar archivos PDF en la base de datos
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            // Obtener userId de la solicitud
            const userId = req.body.userId || req.query.userId;  // Asegúrate de que sea de body o query

            console.log('Cuerpo de la solicitud:', req.body);
            console.log('Query de la solicitud:', req.query);

            if (!userId) {
                return reject(new Error('userId es necesario en la solicitud.'));
            }

            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }

                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads',
                    metadata: { userId: userId }
                };
                resolve(fileInfo);
            });
        });
    },
});

const upload = multer({ storage });

module.exports = upload;
