'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var cursos = require('../controllers/cursos.controller');
const { authcheck } = require('../middlewares/auth');
// Llamamos al router
var router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores
//Genera la vista
router.get("/",  cursos.main);
//Muestra todos los cursos de una categoria en la variable id
router.get("/:id",  cursos.cursos);
//Muestra los finalizados de la categoria ID
router.get("/finalizados/:id",  cursos.cursosFinalizados);
//Muestra el detalle de cada curso con empresas y alumnos
router.get("/detalle/:id/:programa",  cursos.curso_detalle);
//Devuelve todos los instructores para select
router.post("/getInstructores",cursos.getInstructores);
//Agregar un nuevo curso
router.post("/add",cursos.add);
//Asocia empresa a un curso
router.put("/edit",cursos.edit);
//Asocia empresa a un curso
router.post("/addEmpresaInCourse",cursos.addEmpresaCurso);
//Elimina la asociacion de una empresa en un curso
router.delete("/deleteEmpresaInCourse",cursos.deleteEmpresaCurso);
//Agrega la asociación de participante en empresa y curso


// Exportamos la configuración
module.exports = router;



