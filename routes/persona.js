const personaController = require('../controllers/persona');
var express = require('express');
var router = express.Router();

router.get('/personas/consultar/:id',personaController.traerNombre);

module.exports = router;