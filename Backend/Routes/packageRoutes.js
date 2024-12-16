const express = require('express');
const { getAllPackages, createPackage, updatePackage, deletePackage } = require('../controllers/packageController');

const router = express.Router();

router.get('/packages', getAllPackages);
router.post('/admin/packages', createPackage);
router.put('/admin/packages/:id', updatePackage);
router.delete('/admin/packages/:id', deletePackage);

module.exports = router;
