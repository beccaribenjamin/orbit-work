const { Schema, model } = require("mongoose");


const licenseSchema = Schema({

    type: {
        type: String,
        enum: ["Vacaciones", "Estudio", "Maternidad", "Enfermedad", "Otro"],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: { 
        type: String, 
        enum: ["Pendiente", "Aprobada", "Rechazada"], 
        default: "Pendiente" 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required:true,
    },
    company: {
        type: Schema.Types.ObjectId, 
        ref: 'Company', 
        required:true,
    },
})


module.exports = model('License', licenseSchema );