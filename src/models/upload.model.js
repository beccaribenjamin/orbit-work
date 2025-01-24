const { Schema, model } = require('mongoose');

const documentSchema = Schema({
    filename: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Esto asegura que se pueda hacer la referencia al modelo User
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    bucketName: {
        type: String,
        default: 'uploads',  // Nombre del bucket
    },
});

documentSchema.pre('save', function(next) {
    this.metadata.userId = this.userId; // Añadir el userId a los metadatos
    next();
});

const Document = model('Document', documentSchema);

module.exports = Document;
