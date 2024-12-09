const License = require("../models/License");


//Crear una licencia
const createLicense = async(req, res) => {

    try {
        
        const license = new License(req.body);
        const savedLicense = await license.save();
        res.status(201).json(savedLicense);

    } catch (error) {
        res.status(500).json({msg: 'Error al crear la licencia', error})
    }

}

const deleteLicense = async(req, res) => {

    const deleteLicense = await License.findByIdAndDelete(req.params.id)
    if( !deleteLicense ){
        return res.status(200).json({msg: "Licencia no encontrada o no existe"});
    }
    return res.status(204).json({msg: "Licencia eliminada exitosamente"});

}


module.exports = {

    createLicense,

}