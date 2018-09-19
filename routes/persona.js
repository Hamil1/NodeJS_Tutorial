const personaController = require('../controllers/persona');
var express = require('express');
var router = express.Router();

// router.get('/personas/consultar/:id',personaController.traerNombre);
router.get('/JCE/:cedula',personaController.consultarPersonaJCE);

module.exports = router;