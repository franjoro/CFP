'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var habil = require('../controllers/habil.controller');
// Llamamos al router
var router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores

router.get("/", habil.main);


// Exportamos la configuración
module.exports = router;