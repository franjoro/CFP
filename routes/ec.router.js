
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
// Cargamos el controlador
const ec = require('../controllers/ec.controller');
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores

// Devuelve el formulario
router.get("/formulario", ec.main);
// Devuelve el administrador de carreras y cursos
router.get("/administrador", ec.administrador);




// API
// Devuelve las carreras
router.get("/carreras", ec.carreras);
// Devuelve los grupos pertenicientes a la carrera
router.get("/:carrera/grupos", ec.grupos);
// Devuelve table
router.get("/tabla/:idgrupo", ec.tabla)



// Ingresar nuevo registro
router.post("/form" , ec.form);
// Ingresar nueva carrera
router.post("/nuevacarrera" , ec.addCarrera);
// Ingresar nuevo grupo
router.post("/nuevogrupo" , ec.addGrupo);

// Exportamos la configuración
module.exports = router;