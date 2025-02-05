// platoRoutes.js
const express = require('express');
const router = express.Router();
const monumentoController = require('../controllers/monumentoController');

router.get('/', monumentoController.getAllMonumento);
router.get('/:idmonumento', monumentoController.getMonumentoById);
router.post('/', monumentoController.createMonumento);
router.delete('/:idmonumento', monumentoController.deleteMonumento);
router.put('/:idmonumento', monumentoController.updateMonumento);


module.exports = router;