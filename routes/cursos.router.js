// Cargamos el módulo de express para poder crear rutas
const express = require('express');
// Cargamos el controlador
const cursos = require('../controllers/cursos.controller');
const { authcheck } = require('../middlewares/auth');
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores
// Genera la vista


// = = = = = = = = Gestor de documentos
//Main
router.get("/documentos/:curso/:empresa/:programa/:tipo" ,cursos.GestorDeDocumentos)
// Guardar archivo en zip
router.post("/savezip", cursos.getAtZipAllFiles);
//Descargar zip de archivos
router.get("/archivo", cursos.dowloadZip);
//actualizar permisos de edición
router.put("/UpdatePermisos", cursos.UpdatePermisos)




// Muestra todos los cursos de una categoria en la variable id
router.get("/:id?",  cursos.cursos);
// Muestra los finalizados de la categoria ID
router.get("/finalizados/:id",  cursos.cursosFinalizados);
// Muestra el detalle de cada curso con empresas y alumnos
router.get("/detalle/:id/:programa/:tipo",  cursos.curso_detalle);
// Devuelve todos los instructores para select
router.post("/getInstructores",cursos.getInstructores);
// Devuelve todos los cursos de esta categoria para select
router.post("/getCursos/:categoria",cursos.getCursosCategoria);
// Agregar un nuevo curso
router.post("/add",cursos.add);
// Agregar una nueva oferta
router.post("/addOferta",cursos.oferta);
// Agrega la asociación de participante en empresa y curso
router.post("/matricula", cursos.matricula);
// Asocia empresa a un curso
router.post("/addEmpresaInCourse",cursos.addEmpresaCurso);
// Editar curso
router.put("/edit",cursos.edit);
// Cambiar participante de curso en detalles de curso
router.put("/ChangeMatriculaCurso", cursos.ChangeMatriculaCurso);
// migrar bloque entero de solicitud
router.put("/migrarall", cursos.MigrarTodo);
// Borrar matricula de participante en  detalles de curso
router.delete("/deleteMatricula", cursos.deleteMatricula);
// Elimina la asociacion de una empresa en un curso
router.delete("/deleteEmpresaInCourse",cursos.deleteEmpresaCurso);
//Borra las ofertas y cursos
router.delete("/deleteOffer",cursos.delteCursoOferta);





const fileUpload = require("express-fileupload");
router.post("/EnviarFiles" , fileUpload() , cursos.archivos);
//Subir archivos extra
router.post("/archivoExtra",fileUpload() , cursos.ArchivoExtra)

// Exportamos la configuración
module.exports = router;