'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var public_ = require('../controllers/public.controller');
// Llamamos al router
var router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores

router.get("/form/:id?", public_.main);
router.post("/getEmpresas", public_.getEmpresas);


// Exportamos la configuración
module.exports = router;