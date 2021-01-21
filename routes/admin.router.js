'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
const fileUpload = require('express-fileupload');
// Cargamos el controlador
var admin = require('../controllers/admin.controller');
// Llamamos al router
var router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores


router.get("/programa", admin.renderPrograma);



router.post("/programa/add", fileUpload(),admin.addPrograma);
router.get("/programa/table", admin.loadTable);



// Exportamos la configuración
module.exports = router;