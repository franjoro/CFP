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
router.get("/documentos/:curso/:empresa/:programa/:tipo" ,cursos.GestorDeDocumentos);
// Guardar archivo en zip
router.post("/savezip",authcheck , cursos.getAtZipAllFiles);
//Descargar zip de archivos
router.get("/archivo",authcheck , cursos.dowloadZip);
//actualizar permisos de edición
router.put("/UpdatePermisos",authcheck , cursos.UpdatePermisos);
//actualizar permisos de edición
router.delete("/deleteFiles3", authcheck , cursos.deleteFiles3);
// editar comentario
router.put("/UpdateComment",authcheck , cursos.UpdateComment);
// Enviar notificacion a empresas por correo 
router.post("/sendNotificacion",authcheck , cursos.sendNotificacion);




// Generar ZIP de todos los documentos de un curso 
router.post("/saveZipCurso", authcheck , cursos.getZipCurso);
//Descargar zip de archivos
router.get("/archivoZipCurso",authcheck , cursos.dowloadZipCurso); 


// Muestra todos los cursos de una categoria en la variable id
router.get("/:id?",authcheck , cursos.cursos);
// Muestra los finalizados de la categoria ID
router.get("/finalizados/:id",authcheck , cursos.cursosFinalizados);
// Muestra el formulario para ofertas habil o  personas no cotizantes 
router.get("/form/:programa" , authcheck, cursos.form);
// Muestra el detalle de cada curso con empresas y alumnos
router.get("/detalle/:id/:programa/:tipo",authcheck ,  cursos.curso_detalle);
// Devuelve todos los instructores para select
router.post("/getInstructores",authcheck ,cursos.getInstructores);
// Devuelve todos los cursos de esta categoria para select
router.post("/getCursos/:categoria",authcheck ,cursos.getCursosCategoria);
// Agregar un nuevo curso
router.post("/add",authcheck ,cursos.add);
// Agregar una nueva oferta
router.post("/addOferta",authcheck ,cursos.oferta);
// Agrega la asociación de participante en empresa y curso
router.post("/matricula",authcheck , cursos.matricula);
// Asocia empresa a un curso
router.post("/addEmpresaInCourse",authcheck ,cursos.addEmpresaCurso);
// Editar curso
router.put("/edit",authcheck ,cursos.edit);
// Cambiar participante de curso en detalles de curso
router.put("/ChangeMatriculaCurso",authcheck , cursos.ChangeMatriculaCurso);
// migrar bloque entero de solicitud
router.put("/migrarall",authcheck , cursos.MigrarTodo);
// Editar oferta
router.put("/editOferta" ,authcheck , cursos.editOferta);
// Borrar matricula de participante en  detalles de curso
router.delete("/deleteMatricula",authcheck , cursos.deleteMatricula);
// Elimina la asociacion de una empresa en un curso
router.delete("/deleteEmpresaInCourse",authcheck ,cursos.deleteEmpresaCurso);
// Borra las ofertas y cursos
router.delete("/deleteOffer",authcheck ,cursos.delteCursoOferta);




// Editar archivos en gestor de archivos
const fileUpload = require("express-fileupload");
router.post("/EnviarFiles" , fileUpload() , cursos.archivos);
// Subir archivos extra
router.post("/archivoExtra",authcheck ,fileUpload() , cursos.ArchivoExtra);


// Subir oferta de curso para no cotizantes
router.post("/OfertaNoCotizante", authcheck ,fileUpload() , cursos.NuevoCursoHabil);

// Exportamos la configuración
module.exports = router;