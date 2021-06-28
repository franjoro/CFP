// Cargamos el módulo de express para poder crear rutas
const express = require("express");
// Cargamos el controlador
const reportes = require("../controllers/reportes.controller");

// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores

router.get("/",  reportes.main);
router.get("/download" , reportes.descargar);
router.get("/PartiCurso/:curso" , reportes.ParticipantesEnCursos);





// Reportes de Empresa centro - estado situacional.

router.get("/ec", reportes.ec);




// Exportamos la configuración
module.exports = router;
