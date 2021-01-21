'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var usuarios = require('../controllers/usuarios.controller');
// Llamamos al router
var router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores




router.post("/add", usuarios.addUsuario);
router.get("/table", usuarios.loadTable);



// Exportamos la configuración
module.exports = router;