const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");
const Document = require("../models/upload.model.js"); // Modelo de Documento

// Obtener documentos por userId
// backend: src/controllers/upload.controller.js

const getDocumentsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const documents = await mongoose.connection.db
            .collection("uploads.files")
            .find({ "metadata.userId": userId })
            .toArray();

        if (!documents.length) {
            return res.status(404).json({
                message: `No se encontraron documentos para el userId: ${userId}`,
            });
        }

        res.status(200).json({
            message: "Documentos encontrados:",
            documents,
        });
    } catch (error) {
        console.error("Error al obtener documentos:", error);
        res.status(500).json({
            message: "Ocurrió un error al obtener los documentos",
            error: error.message,
        });
    }
};

// Función para firmar el PDF
const signPDF = async (req, res) => {
    const { fileId, signature, x, y, width, height } = req.body;

    try {
        // Buscar el archivo en GridFS por el _id
        const file = await mongoose.connection.db
            .collection("uploads.files")
            .findOne({ _id: new mongoose.Types.ObjectId(fileId) }); // Usa 'new' aquí

        if (!file) {
            return res.status(404).json({
                message: `Documento no encontrado con ID: ${fileId}`,
            });
        }

        // Obtener el archivo de GridFS
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: "uploads",
        });
        const downloadStream = bucket.openDownloadStream(file._id);

        const chunks = [];
        downloadStream.on("data", (chunk) => chunks.push(chunk));
        downloadStream.on("end", async () => {
            const pdfBytes = Buffer.concat(chunks);
            const pdfDoc = await PDFDocument.load(pdfBytes);

            const page = pdfDoc.getPage(0); // Suponiendo que es la primera página

            // Convertir la firma a una imagen
            const signatureBytes = Buffer.from(
                signature.split(",")[1],
                "base64"
            );
            const pngImage = await pdfDoc.embedPng(signatureBytes);

            // Posicionar la firma en el PDF
            page.drawImage(pngImage, {
                x: parseFloat(x),
                y: parseFloat(y),
                width: parseFloat(width),
                height: parseFloat(height),
            });

            // Guardar el PDF firmado
            const signedPdfBytes = await pdfDoc.save();

            // Subir el archivo firmado a GridFS
            const uploadStream = bucket.openUploadStream(
                `${file.filename}-signed.pdf`,
                {
                    metadata: { userId: file.metadata.userId, signedDoc: true }, // Marcamos el documento como firmado
                    contentType: "application/pdf",
                }
            );

            // Subimos el archivo firmado a GridFS
            uploadStream.end(signedPdfBytes);

            // Devolver la ruta del PDF firmado en GridFS
            res.json({
                message: "PDF firmado correctamente",
                signedPdfPath: `/uploads/${uploadStream.id}`,
            });
        });

        downloadStream.on("error", (err) => {
            console.error("Error al leer el archivo de GridFS:", err);
            res.status(500).json({
                message: "Error al leer el archivo de GridFS",
            });
        });
    } catch (error) {
        console.error("Error en la firma del PDF:", error);
        res.status(500).json({
            message: "Ocurrió un error al firmar el PDF",
            error: error.message,
        });
    }
};

module.exports = {
    getDocumentsByUserId,
    signPDF,
};
