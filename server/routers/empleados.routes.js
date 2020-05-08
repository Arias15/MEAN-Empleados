
const express = require('express');
const router = express.Router();

const empleado = require('../controllers/empleado.controller');

router.get('/', empleado.getEmployees);
router.post('/', empleado.createEmployee);
router.get('/:id', empleado.getEmployee);
router.put('/:id', empleado.editEmployee);
router.delete('/:id', empleado.deleteEmployee);

module.exports = router;
