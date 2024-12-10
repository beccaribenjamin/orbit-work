const Router = require('express');
const { createLicense, deleteLicense, editLicense, getLicensesByCompany, getLicensesByUser } = require('../controllers/licenses.controller')

const router = Router()

//Crear Licencia
router.post('/', createLicense);

//Aprobar Licencia
router.put('/:id', editLicense );

//Obtener Licencias por compañia
router.get('/company/:companyId', getLicensesByCompany);

//Obtener Licencias por Usuario
router.get('/user/:userId', getLicensesByUser)

//Eliminar licencia
router.delete('/:id', deleteLicense);

module.exports = router;