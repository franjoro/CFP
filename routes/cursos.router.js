'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var cursos = require('../controllers/cursos.controller');
const { authcheck } = require('../middlewares/auth');
// Llamamos al router
var router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores

router.get("/",  cursos.main);
router.get("/:id",  cursos.cursos);
router.get("/finalizados/:id",  cursos.cursosFinalizados);
router.get("/detalle/:id/:programa",  cursos.curso_detalle);
router.post("/getInstructores",cursos.getInstructores);
router.post("/add",cursos.add);


// Exportamos la configuración
module.exports = router;



