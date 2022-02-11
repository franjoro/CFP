
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
//Traemos el middleware
const { authcheck } = require('../middlewares/auth');
const pdfController = require('../controllers/habil/pdfController.controller');
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
// "/admin/habil/nameInscriptions/:document"
router.get("/nameInscriptions/:document/:idCourse", readHabil.nameInscriptions);
// "/admin/habil/validate-schedule/:dui/idCourse"
router.get("/validate-schedule/:document/:idCourse", readHabil.validateSchedule);
// /"admin/habil/options-schedule/:idCourse"
router.get("/options-schedule/:idCourse", readHabil.optionsSchedule);
// "/admin/habil/gracias/habil/:idProgram?"
router.get("/gracias/habil/:idProgram?", habil.agradecimiento);
router.get("/deshabilitado/habil", habil.disabled);
//Vista de subida de documentación
router.get("/documentacion/habil/:idSolicitud/documento/:documento?/:documento2?", habil.documentacion);
router.get("/gestor-de-documentos/habil/:idCurso/:idSolicitud/:dui/:programa/:tipo?", habil.gestorDeDocumentacion);
//#region tables
router.get('/application-table/:idCourse', tableaHabil.aplicationsTable);
router.get("/changecolor-table/:idCourse", tablesHabil.changeColor);
router.get("/notComplete/:idCourse", tablesHabil.notComplete);
router.get("/changeColorWait/:idCourse", tablesHabil.changeColorWait);
router.get('/count-solicitud/:idCourse', habil.countSolicitud);
router.get("/noInscritosSgafp/:idCourse", tablesHabil.noInscritosSgafp);
router.get("/inscritosSgafp/:idCourse", tablesHabil.inscritosSgafp);
router.get("/findRegionForId/:idSolicitud", authcheck, readHabil.findRegionForId);
//#endregion

//#region delete sentences
router.delete("/deleteFiles3", deleteDocumentos.deleteFiles3);
router.delete("/deleteSolicitud", deleteSolicitud.delete);
//#endregion

//#region post sentences 
router.post("/updateFile", fileUpload(), updateFile.archivos);
router.post("/", habil.form);
router.post("/EnviarFiles/:tipo?", fileUpload(), subida.archivos);
router.post("/sendMail", habil.sendEmail);
router.post("/sendNotificacion", sendNotificacion.send);
router.post("/sendMailDocument", habil.sendMailDocument);
router.post("/sendEmailSol", habil.sendEmailSol);
//#endregion

//#region put sentences
router.put("/editOferta" , updateHabil.editOferta);
router.put("/updateComment", updateComment.update);
router.put("/matricular", updateHabil.cambiarCurso);
router.put("/", updateHabil.updateSolicitud);
router.put('/updateStatusRequest', updateStatusRequest.update);
router.put("/updateRequest", updateHabil.updateRequest);
router.put("/sgafp", updateHabil.sgafp);

//#endregion


// #region zip
router.post("/saveZipCourse", authcheck, zipCourse.getZipCouse);
router.post("/saveZipParticipant", authcheck, zipCourse.getZipParticipant);
router.get("/fileZipCourse/zip", authcheck, zipCourse.dowloadZipCourse);
//#endregion


//#region print ballot
// router.get('/printpdf', pdfController.printPDF);
router.get('/download/pdf', authcheck, pdfController.downloadFile);
router.post("/send/pdf/:idSolicitud", pdfController.printPDF);
//#endregion

// export routes
module.exports = router;