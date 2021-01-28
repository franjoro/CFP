'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var ins = require('../controllers/ins.controller');
const { authcheck } = require('../middlewares/auth');
// Llamamos al router
var router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores


router.get("/table/:estado?*", ins.table);
router.put("/changeEstado", ins.changeEstado);
router.put("/editar", ins.editar);
router.post("/add", ins.add);






// Exportamos la configuración
module.exports = router;