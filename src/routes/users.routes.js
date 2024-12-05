const { Router } = require('express');
const { createUser, editUser, getUserById, getUsersByCompany, deleteUser } = require('../controllers/users.controller');
const { isAdmin, verifyToken } = require('../middlewares/auth');

const router = Router();



//Crear usuario(Solo admin)
router.post('/register', createUser);

//Obtener Usuarios
router.get('/company/:companyId', getUsersByCompany)

//Editar Usuario
router.put('/:id', editUser)

//Obtener usuarioi
router.get('/:id', getUserById)

router.delete('/:id', deleteUser)


module.exports = router;