
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
// Cargamos el controlador
const ec = require('../controllers/ec.controller');
const { authcheck } = require('../middlewares/auth');
// Llamamos al router
const router = express.Router();

// Creamos una ruta para los métodos que tenemos en nuestros controladores

// Devuelve el formulario
router.get("/formulario", authcheck, ec.main);
// Devuelve el administrador de carreras y cursos
router.get("/administrador", authcheck, ec.administrador);




// API
// Devuelve las carreras
router.get("/carreras", ec.carreras);
// Devuelve los grupos pertenicientes a la carrera
router.get("/:carrera/grupos",  ec.grupos);
// Devuelve table
router.get("/tabla/:idgrupo",   ec.tabla)


// Administrador 
// Ingresar nuevo alumno en situacional
router.post("/form" , authcheck, ec.form);
// Ingresar nueva carrera
router.post("/nuevacarrera" , authcheck, ec.addCarrera);
// Editar carrera
router.put("/editcarrera" , authcheck, ec.editcarrera);
// Ingresar nuevo grupo y copia el modelo en el cronograma vigente
router.post("/nuevogrupo" , authcheck, ec.addGrupo);
// Desactivar carrera
router.put("/disabledGrupo" , authcheck , ec.changeEstadoGrupo)
// Editar un grupo
router.put("/editgrupo" , authcheck, ec.editgrupo);

// Modelos 
// Devuelve el modelo de cronograma de una carrera
router.get("/modelo/:idCarrera", authcheck, ec.administradorModelo);
// Ingresar nuevo Módulo
router.post("/addModelo" ,  authcheck,ec.addModelo);
// Ingresar nueva unidad
router.post("/addUnidad" ,  authcheck, ec.addUnidad);
// Eliminar Modulo
router.delete("/deleteModelo" , authcheck, ec.deleteModelo);
// Eliminar Unidad
router.delete("/deleteUnidad" ,  authcheck, ec.deleteUnidad);
// Editar unidad
router.put("/editUnidad" ,authcheck, ec.editUnidad)
// Editar modulo
router.put("/editModulo" , authcheck, ec.editModulo)

// Cronogram vigente 
// Devuelve el cronograma de un grupo
router.get("/cronograma/:idGrupo", authcheck, ec.administradorCronogramaVigente);
// Cambia la configuración y el estado de la unidad
router.put("/ConfigUnit",  authcheck, ec.editUnidadVigente)
// Agrega un nuevo modulo en cronograma vigente
router.post("/addModeloVigente", authcheck, ec.addModeloVigente);
// Agrega una nueva unidad en cronograma vigente
router.post("/addUnidadVigente",  authcheck, ec.addUnidadVigente);


// Instructores
// Devuelve las unidades asignadas al instructor tomando en cuenta las fechas actuales
router.get("/instructor",authcheck , ec.instructor);
// Devuelve las actividades asignadas a la unidad
router.get("/evaluaciones/:unidad/:grupo", authcheck , ec.contenidos);
// Agregar nueva evaluación
router.post("/newEv", authcheck , ec.newEva);
// Elimina las evaluaciones y notas asociadas
router.delete("/deleteEva" , authcheck , ec.deteleEva)
// Devuelve las notas de los alumnos
router.get("/notas/:evaluacion/:grupo", authcheck , ec.notas);
// Ingresar notas
router.post("/notas" , authcheck , ec.notasP)



// Exportamos la configuración
module.exports = router;