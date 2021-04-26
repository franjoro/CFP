
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
// Cargamos el controlador
const ec = require('../controllers/ec.controller');
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores

// Devuelve el formulario
router.get("/", ec.main);
// Devuelve las carreras
router.get("/carreras", ec.carreras);
// Devuelve los grupos pertenicientes a la carrera
router.get("/:carrera/grupos", ec.grupos);



// Exportamos la configuración
module.exports = router;