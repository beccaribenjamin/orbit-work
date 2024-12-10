const License = require("../models/license.model");



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

//Editar Licencias
const editLicense = async(req, res) => {

    const id = req.params.id;
    const {_id, ...resto} = req.body;

    const licenseFound = await License.findByIdAndUpdate( id, resto );

    res.json({
        msg: 'Licencia Encontrada',
        licenseFound,
    })

}


//Obtener licencias de una compañya

const getLicensesByCompany = async(req, res) => {

    try {
        
        const {companyId} = req.params;
        const licenses = await License.find({ company: companyId });
        if( licenses.length === 0 ){
            return res.status(404).json({msg: 'No se encontraron licencias para esta empresa'});
        }
        res.json(licenses);
    } catch (error) {
        res.status(500).json({msg: 'Error al obtener licencias por compañia', error});
    }

}

//Obtener Licencias por usuario
const getLicensesByUser = async(req, res) => {

    try {

        const {userId} = req.params;
        const licenses = await License.find({ user: userId })
        if( licenses.length === 0 ){
            return res.status(404).json({msg: 'No se encontraron licencias para este usuario'});
        }
        res.json(licenses);

    } catch (error) {
        res.status(500).json({msg: 'Error al obtener licencias por usuario', error})
    }

}


//Eliminar Licencia
const deleteLicense = async(req, res) => {

    const deleteLicense = await License.findByIdAndDelete(req.params.id)
    if( !deleteLicense ){
        return res.status(200).json({msg: "Licencia no encontrada o no existe"});
    }
    return res.status(204).json({msg: "Licencia eliminada exitosamente"});

}


module.exports = {

    createLicense,
    getLicensesByCompany,
    getLicensesByUser,
    editLicense,
    deleteLicense,

}