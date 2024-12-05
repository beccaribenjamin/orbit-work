const { Router } = require('express');
const { login, logout,verifyToken } = require('../controllers/auth.controller');

const router = Router();

router.post('/login', login);

router.get("/verify", verifyToken)

module.exports = router;