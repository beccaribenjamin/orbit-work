// src/middlewares/upload.js

const formidable = require('formidable');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const path = require('path');
const fs = require('fs');

// Conexión a MongoDB
const mongoURI = process.env.MONGODB_CNN;
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Esta variable se inicializa solo después de que la conexión se ha establecido correctamente
let bucket;

conn.once('open', () => {
    console.log('Conectado a MongoDB');
    // Inicializamos el bucket de GridFS solo cuando la conexión esté lista
    bucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
});

conn.on('error', (err) => {
    console.log('Error en la conexión de MongoDB:', err);
});

// Middleware de formidable para cargar archivos
const upload = (req, res, next) => {
    const form = new formidable.IncomingForm();
    
    form.parse(req, (err, fields, files) => {
        if (err) {
            // console.log('Error en la subida de archivo:', err);
            return res.status(500).json({ message: 'Error al procesar el archivo.' });
        }

        // Log para verificar qué llega en fields
        // console.log('Campos recibidos:', fields);
        
        // Verifica si el archivo está presente
        if (!files.file) {
            return res.status(400).json({ message: 'No se ha recibido un archivo.' });
        }

        const file = files.file[0];  // `files.file` es un array, así que tomamos el primer elemento
        const filename = file.originalFilename;
        const filePath = file.filepath;

        // console.log("Archivo recibido:", filename);

        if (!bucket) {
            return res.status(500).json({ message: 'Conexión a GridFS aún no está lista.' });
        }

        // Tomar el primer valor de userId si es un array
        const userId = fields.userId && !Array.isArray(fields.userId) ? fields.userId : fields.userId[0];

        // Log para verificar el valor de userId
        // console.log("userId recibido:", userId);

        if (!userId) {
            return res.status(400).json({ message: 'userId es necesario.' });
        }

        // Subir el archivo a GridFS
        const uploadStream = bucket.openUploadStream(filename, {
            metadata: { userId: userId }, // Ahora userId es un valor único, no un array
            contentType: file.mimetype
        });

        const fileReadStream = fs.createReadStream(filePath);
        fileReadStream.pipe(uploadStream);

        uploadStream.on('finish', () => {
            // console.log("Archivo subido exitosamente a GridFS");

            // Puedes devolver la respuesta con el archivo guardado
            res.json({
                message: 'Archivo subido exitosamente',
                file: {
                    filename: filename,
                    fileId: uploadStream.id  // ID del archivo en GridFS
                }
            });
        });

        uploadStream.on('error', (err) => {
            // console.log("Error al subir el archivo a GridFS:", err);
            res.status(500).json({ message: 'Error al guardar el archivo en GridFS.' });
        });
    });
};



module.exports = upload;
