
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
//Traemos el middleware
const cursos = require("../controllers/cursos.controller.js");
// Llamamos al router
const router = express.Router();
//SENTANCIAS RES.GET
// Creamos una ruta para los métodos que tenemos en nuestros controladore
router.get("/:idPrograma", cursos.main);
// Exportamos la configuración
module.exports = router;