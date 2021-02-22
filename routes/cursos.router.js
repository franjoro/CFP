
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
// Cargamos el controlador
const cursos = require('../controllers/cursos.controller');
const { authcheck } = require('../middlewares/auth');
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores
// Genera la vista

router.get("/",  cursos.main);
// Muestra todos los cursos de una categoria en la variable id
router.get("/:id",  cursos.cursos);
// Muestra los finalizados de la categoria ID
router.get("/finalizados/:id",  cursos.cursosFinalizados);
// Muestra el detalle de cada curso con empresas y alumnos
router.get("/detalle/:id/:programa",  cursos.curso_detalle);
// Devuelve todos los instructores para select
router.post("/getInstructores",cursos.getInstructores);
// Devuelve todos los cursos de esta categoria para select
router.post("/getCursos/:categoria",cursos.getCursosCategoria);
// Agregar un nuevo curso
router.post("/add",cursos.add);
// Agrega la asociación de participante en empresa y curso
router.post("/matricula", cursos.matricula);
// Asocia empresa a un curso
router.post("/addEmpresaInCourse",cursos.addEmpresaCurso);
// Editar curso
router.put("/edit",cursos.edit);
// Cambiar participante de curso en detalles de curso
router.put("/ChangeMatriculaCurso", cursos.ChangeMatriculaCurso);
// Borrar matricula de participante en  detalles de curso
router.delete("/deleteMatricula", cursos.deleteMatricula);
// Elimina la asociacion de una empresa en un curso
router.delete("/deleteEmpresaInCourse",cursos.deleteEmpresaCurso);



// ==== ARCHIVOS
//Guardar archivo en zip
router.get("/savezip", cursos.getAtZipAllFiles);
//Descargar archivo
router.get("/archivo", cursos.dowloadZip);




// Exportamos la configuración
module.exports = router;
