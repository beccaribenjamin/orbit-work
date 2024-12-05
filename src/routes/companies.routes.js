const { Router } = require('express');
const { createCompany, getCompanyEmployees } = require('../controllers/companies.controller');
// const { verifyToken } = require('../middlewares/auth');

const router = Router();

router.post('/', createCompany);


module.exports = router;
