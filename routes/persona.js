const personaController = require('../controllers/persona');
var express = require('express');
var router = express.Router();

// router.get('/personas/consultar/:id',personaController.traerNombre);
// router.get('/JCE/:cedula',personaController.consultarPersonaJCE);
router.get('/db/consultar/:id', personaController.consultarPersonaDBLocal);
// router.get('/db/insertar/:nombre/:apellido/:direccion', personaController.insertarPersonaDBLocal);
// router.get('/db/actualizar/:id/:nombre/:apellido/:direccion', personaController.updatePersonaDBLocal);

module.exports = router;