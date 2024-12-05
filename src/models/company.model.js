const {Schema, model } = require('mongoose');

const companySchema = Schema({
    name: {
        type: String,
        require: [true, 'El nombre de la empresa es obligatorio'],
        unique: true,
    },
    description: {
        type: String
    },
    adminEmail: {
        type: String,
        required: [true, 'El correo del administrador es obligatorio'],
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    employees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
},
{
    timestaps: true,
})

module.exports = model('Company', companySchema);