const express = require('express');
const router = express.Router();
const ciudadController = require('../controllers/ciudadController');

router.get('/', ciudadController.getAllCiudad);
router.get('/:idciudad', ciudadController.getCiudadById);
router.post('/', ciudadController.createCiudad);
router.delete('/:idciudad', ciudadController.deleteCiudad);
router.put('/:idciudad', ciudadController.updateCiudad);


module.exports = router;