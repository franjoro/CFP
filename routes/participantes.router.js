'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var participantes = require('../controllers/participantes.controller');
const { authcheck } = require('../middlewares/auth');
// Llamamos al router
var router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores

router.get("/",  participantes.main);
router.get("/table",  participantes.loadTable);






// Exportamos la configuración
module.exports = router;