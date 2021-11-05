
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
const tableaHabil = require('../controllers/habil/tablesHabil.controller');
const zipCourse  = require('../controllers/habil/zip.controller');
const updateStatusRequest = require('../controllers/habil/updateStatusRequest');
// Llamamos al router
const router = express.Router();
const fileUpload = require("express-fileupload");// proteccion para fileUpload
const tablesHabil = require('../controllers/habil/tablesHabil.controller');


//SENTANCIAS RES.GET
// Creamos una ruta para los métodos que tenemos en nuestros controladore
router.get("/:codigoCurso/", habil.main);
//renderizado especial
router.get("/formulario/:idSolicitud/:type?/:view?", habil.renderFormulario);
//recoleccion de información
router.get("/readSolicitud/detalle/:idSolicitud?", readHabil.readDet);
//recoleccion de informacion a partir del DUI
router.get("/readSolicitud/detalle-dui/:dui", readHabil.readDetWhitDUI);
//Agregar vista de agradecimiento por rellenar el formulario
router.get("/gracias/habil", habil.agradecimiento);
//Vista de subida de documentación
router.get("/documentacion/habil/:idSolicitud/documento/:documento?/:documento2?", habil.documentacion);
router.get("/gestor-de-documentos/habil/:idCurso/:idSolicitud/:dui/:programa/:tipo?", authcheck, habil.gestorDeDocumentacion);
//#region tables
router.get('/application-table/:idCourse', authcheck, tableaHabil.aplicationsTable);
router.get("/changecolor-table/:idCourse", authcheck, tablesHabil.changeColor);
router.get("/changeColorWait/:idCourse", authcheck, tablesHabil.changeColorWait);
router.get('/count-solicitud/:idCourse', habil.countSolicitud);
//#endregion

//#region delete sentences
router.delete("/deleteFiles3", authcheck , deleteDocumentos.deleteFiles3);
router.delete("/deleteSolicitud", authcheck , deleteSolicitud.delete);
//#endregion

//#region post sentences 
router.post("/updateFile", fileUpload(), updateFile.archivos);
router.post("/", habil.form);
router.post("/EnviarFiles/:tipo?", fileUpload(), subida.archivos);
router.post("/sendMail", authcheck, habil.sendEmail);
router.post("/sendNotificacion", authcheck, sendNotificacion.send)
router.post("/sendMailDocument", authcheck, habil.sendMailDocument);
router.post("/sendEmailSol", authcheck, habil.sendEmailSol);
//#endregion

//#region put sentences
router.put("/editOferta" ,authcheck , updateHabil.editOferta);
router.put("/updateComment", authcheck, updateComment.update);
router.put("/matricular", authcheck, updateHabil.cambiarCurso);
router.put("/", updateHabil.updateSolicitud);
router.put('/updateStatusRequest', updateStatusRequest.update);
router.put("/updateRequest", authcheck, updateHabil.updateRequest);

//#endregion


// #region zip
router.post("/saveZipCourse", authcheck, zipCourse.getZipCouse);
router.post("/saveZipParticipant", authcheck, zipCourse.getZipParticipant);
router.get("/fileZipCourse/zip", authcheck, zipCourse.dowloadZipCourse);
//#endregion

// export routes
module.exports = router;