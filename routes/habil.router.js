
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
// Cargamos el controlador
const habil = require('../controllers/habil.controller');
// Llamamos al router
const router = express.Router();
const fileUpload = require("express-fileupload");// proteccion para fileUpload
// Creamos una ruta para los métodos que tenemos en nuestros controladores

router.get("/:codigoCurso", habil.main);
// Agregar nuevo participante en habil
router.post("/", habil.form);
//Agregar vista de agradecimiento por rellenar el formulario
router.get("/agradecimiento/habil", habil.agradecimiento);
//Vista de subida de documentación
router.get("/documentacion/habil/:idSolicitud?/documento/:dui?", habil.documentacion);
//Enviar documentos para guardar en AWS
router.post("/EnviarFiles", fileUpload(), habil.archivos);

// Exportamos la configuración
module.exports = router;