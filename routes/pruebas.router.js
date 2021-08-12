
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
// Cargamos el controlador
const pruebas = require('../controllers/pruebas.controller');
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores

router.get("/:intento?", pruebas.llamada);
// Agregar nuevo participante en habil
// Exportamos la configuración
module.exports = router;