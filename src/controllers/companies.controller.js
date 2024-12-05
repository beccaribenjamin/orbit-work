const bcryptjs = require('bcryptjs')
const Company = require('../models/company.model');

const createCompany = async( req, res ) => {
    
    try {
        
        const { name, adminEmail, password } = req.body;

        //Validar el nombre de la empresa
        if( !name ){
            return res.status(400).json({
                msg: 'El nombre de la empresa es obligatorio',
            })
        }

        //Crear y guardar la empresa en la base de datos
        const company = new Company({ name, adminEmail, password });

        //Encriptamos contraseña
        const salt = bcryptjs.genSaltSync();
        company.password = bcryptjs.hashSync( password, salt )


        await company.save();

        res.status(201).json({
            msg: 'Empresa creada exitosamente',
            company
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al crear la empresa'
        })
    }

}


module.exports = {
    createCompany,
}
