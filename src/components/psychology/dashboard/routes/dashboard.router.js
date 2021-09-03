
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
//Traemos el middleware
const dashboard = require("../controllers/dashboard.controller");
// Llamamos al router
const router = express.Router();
//SENTANCIAS RES.GET
// Creamos una ruta para los métodos que tenemos en nuestros controladore
router.get("/", dashboard.main);
// Exportamos la configuración
module.exports = router;