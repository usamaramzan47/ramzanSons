const express = require('express');
const {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeByDept
} = require('../controllers/employes');
const router = express.Router();

// employees routes 
router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.get('/dept/:id', getEmployeeByDept);


module.exports = router;