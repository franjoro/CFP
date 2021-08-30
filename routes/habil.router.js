
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
//Traemos el middleware
const { authcheck } = require('../middlewares/auth');
const habil = require('../controllers/habil.controller');
const subida = require('../controllers/habil/subidaDatos.controller');
const updateHabil = require('../controllers/habil/update.controller');
const deleteDocumentos = require('../controllers/habil/deleteDocumento.controller');
const updateFile = require('../controllers/habil/updateFile.controller');
const updateComment = require('../controllers/habil/updateComment.controller');
const sendNotificacion = require('../controllers/habil/sendNotification.controller')
const deleteSolicitud = require('../controllers/habil/deleteSolicitud.controller');
const readHabil = require('../controllers/habil/readHabil.controller');
// Llamamos al router
const router = express.Router();
const fileUpload = require("express-fileupload");// proteccion para fileUpload


//SENTANCIAS RES.GET
// Creamos una ruta para los métodos que tenemos en nuestros controladore
router.get("/:codigoCurso/", habil.main);
//renderizado especial
router.get("/formulario/:idSolicitud", habil.renderFormulario);
//recoleccion de información
router.get("/readSolicitud/detalle/:idSolicitud?", readHabil.readDet);
//Agregar vista de agradecimiento por rellenar el formulario
router.get("/gracias/habil", habil.agradecimiento);
//Vista de subida de documentación
router.get("/documentacion/habil/:idSolicitud/documento/:documento?/:documento2?", habil.documentacion);

router.get("/gestor-de-documentos/habil/:idCurso/:idSolicitud/:dui/:programa/:tipo?", authcheck, habil.gestorDeDocumentacion);
//Enviar documentos para guardar en AWS

//SENTENCIAS RES.POST
router.post("/EnviarFiles", fileUpload(), subida.archivos);
router.post("/sendMail", authcheck, habil.sendEmail);
router.post("/sendNotificacion", authcheck, sendNotificacion.send)
router.post("/sendMailDocument", authcheck, habil.sendMailDocument);
router.delete("/deleteFiles3", authcheck , deleteDocumentos.deleteFiles3);
router.delete("/deleteSolicitud", authcheck , deleteSolicitud.delete);
// Agregar nuevo participante en habil
router.post("/updateFile", fileUpload(), updateFile.archivos);
router.put("/updateComment", authcheck, updateComment.update);
router.put("/matricular", authcheck, updateHabil.cambiarCurso);
router.post("/", habil.form);

//SENTENCIAS RES.PUT
router.put("/editOferta" ,authcheck , updateHabil.editOferta);

// Exportamos la configuración
module.exports = router;