
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
//Traemos el middleware
const { authcheck } = require('../middlewares/auth');
const habil = require('../controllers/habil.controller');
const subida = require('../controllers/habil/subidaDatos.controller');
const updateHabil = require('../controllers/habil/update.controller');
// Llamamos al router
const router = express.Router();
const fileUpload = require("express-fileupload");// proteccion para fileUpload


//SENTANCIAS RES.GET
// Creamos una ruta para los métodos que tenemos en nuestros controladore
router.get("/:codigoCurso", habil.main);
//Agregar vista de agradecimiento por rellenar el formulario
router.get("/gracias/habil", habil.agradecimiento);
//Vista de subida de documentación
router.get("/documentacion/habil/:idSolicitud?/documento/:documento?/:documento2?", habil.documentacion);

router.get("/gestor-de-documentos/habil/:idCurso/:idSolicitud/:dui/:programa/:tipo?", authcheck, habil.gestorDeDocumentacion);
//Enviar documentos para guardar en AWS

//SENTENCIAS RES.POST
router.post("/EnviarFiles", fileUpload(), subida.archivos);
router.post("/sendMail", authcheck, habil.sendEmail);
router.post("/sendMailDocument", authcheck, habil.sendMailDocument);
// Agregar nuevo participante en habil
router.post("/", habil.form);

//SENTENCIAS RES.PUT
router.put("/editOferta" ,authcheck , updateHabil.editOferta);

// Exportamos la configuración
module.exports = router;