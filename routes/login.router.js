'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var login = require('../controllers/login.controller');
// Llamamos al router
var router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores




router.get("/", login.renderIndex);
router.post("/signin", login.signin);
router.get("/signout", login.signout);





// Exportamos la configuración
module.exports = router;