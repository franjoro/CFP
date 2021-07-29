
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
// Cargamos el controlador
const habil = require('../controllers/habil.controller');
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores

router.get("/:codigoCurso?", habil.main);
// Agregar nuevo participante en habil
router.post("/", habil.form);


// Exportamos la configuración
module.exports = router;