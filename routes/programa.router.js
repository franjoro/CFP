'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
const fileUpload = require('express-fileupload');
// Cargamos el controlador
var programa = require('../controllers/programa.controller');
// Llamamos al router
var router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores




router.post("/add", fileUpload(), programa.addPrograma);
router.get("/table", programa.loadTable);



// Exportamos la configuración
module.exports = router;